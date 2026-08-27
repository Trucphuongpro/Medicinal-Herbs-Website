# Hướng dẫn deploy

Kiến trúc: **Vercel** (frontend) + **Render** (backend) + **Neon** (Postgres).
Cả ba đều có bậc miễn phí, nâng cấp bằng cách bật công tắc, không phải làm lại.

```
Trình duyệt
   ├── <ten-app>.vercel.app        → FE tĩnh + ảnh trong /images/products
   └── <ten-api>.onrender.com/api  → BE NestJS
                                        └── Neon Postgres (SSL)
```

Làm đúng thứ tự dưới đây, vì mỗi bước cần thông tin của bước trước.

---

## Bước 1 — Tạo database trên Neon

1. Vào https://neon.tech, đăng ký (đăng nhập bằng GitHub được).
2. **Create project**, chọn region gần Việt Nam nhất (Singapore).
3. Vào **Connection string**, chọn dạng **psql / URI**, copy chuỗi dạng:

```
postgresql://user:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

Giữ chuỗi này, các bước sau đều cần.

> Neon miễn phí không hết hạn, nhưng database tự ngủ sau 5 phút không dùng và
> thức lại trong khoảng 1 giây. Không cần làm gì thêm.

---

## Bước 2 — Tạo bảng và đổ dữ liệu mẫu

Chạy từ máy bạn, trỏ thẳng vào Neon. Không cần chờ deploy backend.

```bash
cd websiteduoclieu_be

# Tạo toàn bộ bảng
DATABASE_URL="<chuỗi Neon ở bước 1>" npm run migration:run

# Đổ 36 sản phẩm, 6 danh mục, 8 tài khoản, 79 đánh giá, 14 đơn hàng
DATABASE_URL="<chuỗi Neon ở bước 1>" npm run seed
```

Kiểm tra:

```bash
DATABASE_URL="<chuỗi Neon>" npx ts-node -e "
import ds from './data-source';
ds.initialize().then(async () => {
  console.log(await ds.query('select count(*) from products'));
  await ds.destroy();
});"
```

> **Cảnh báo:** `npm run seed` **xoá sạch** 8 bảng trước khi chèn. Chỉ chạy lần
> đầu. Sau khi có khách hàng thật, tuyệt đối không chạy lại — script đã tự chặn
> khi `NODE_ENV=production`, muốn vượt phải thêm `-- --force`.

---

## Bước 3 — Deploy backend lên Render

1. Vào https://render.com → **New** → **Web Service** → kết nối GitHub repo
   `Trucphuongpro/Medicinal-Herbs-Website`.
2. Cấu hình:

| Mục | Giá trị |
|---|---|
| Branch | `project1` |
| Root Directory | *(để trống — nhánh này chính là thư mục backend)* |
| Runtime | Node |
| Build Command | `npm ci && npm run build` |
| Start Command | `npm run start:prod` |
| Instance Type | Free |

3. Mục **Environment**, thêm các biến:

| Biến | Giá trị |
|---|---|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | chuỗi Neon ở bước 1 |
| `JWT_SECRET` | sinh mới: `openssl rand -hex 32` |
| `CLOUDINARY_CLOUD_NAME` | lấy từ `.env` ở máy |
| `CLOUDINARY_API_KEY` | lấy từ `.env` ở máy |
| `CLOUDINARY_API_SECRET` | lấy từ `.env` ở máy |

Chưa khai `FRONTEND_ORIGIN` vì chưa có domain frontend — quay lại ở bước 5.

4. **Create Web Service**, chờ build. Xong sẽ có URL dạng
   `https://<ten-api>.onrender.com`.
5. Kiểm tra: mở `https://<ten-api>.onrender.com/api/products` — phải thấy JSON
   36 sản phẩm.

> `NODE_ENV=production` khiến ứng dụng **tắt `synchronize` và chạy migration**
> lúc khởi động. Đây là điểm mấu chốt: `synchronize` tự sửa schema cho khớp
> entity và có thể xoá cột đang chứa dữ liệu thật.

---

## Bước 4 — Deploy frontend lên Vercel

1. Vào https://vercel.com → **Add New** → **Project** → chọn cùng repo.
2. Cấu hình:

| Mục | Giá trị |
|---|---|
| Branch | `UI_Admin` |
| Framework Preset | Vite |
| Build Command | `npm run build` *(đã có trong `vercel.json`)* |
| Output Directory | `dist` |

3. Mục **Environment Variables**, thêm:

| Biến | Giá trị |
|---|---|
| `VITE_API_BASE_URL` | `https://<ten-api>.onrender.com` |

4. **Deploy**. Xong sẽ có URL dạng `https://<ten-app>.vercel.app`.

> `VITE_API_BASE_URL` được nhúng vào lúc **build**, không phải lúc chạy. Đổi
> biến này thì phải **Redeploy** mới có tác dụng.

---

## Bước 5 — Nối hai đầu lại

Quay lại Render → **Environment** → thêm:

| Biến | Giá trị |
|---|---|
| `FRONTEND_ORIGIN` | `https://<ten-app>.vercel.app` |

Render tự khởi động lại. Từ lúc này API chỉ nhận request từ đúng domain đó.

---

## Kiểm tra cuối

Mở `https://<ten-app>.vercel.app` và thử:

- [ ] Trang chủ hiện 36 sản phẩm kèm ảnh
- [ ] Trang Cửa hàng lọc được theo danh mục
- [ ] Đăng nhập `admin@duoclieu.vn` / `admin123`
- [ ] Vào Hồ sơ, thấy đúng tên và số đơn
- [ ] Thêm sản phẩm vào giỏ

---

## Những điều cần biết

**Render bậc miễn phí ngủ sau 15 phút không ai truy cập.** Người vào lần đầu
sau đó phải chờ 30–50 giây. Đi phỏng vấn hay nộp bài thì nên mở trước vài phút.
Trả 7 USD/tháng là hết ngủ.

**Ảnh sản phẩm nằm trong bản build frontend**, không phải trên backend. Database
chỉ lưu đường dẫn tương đối `/images/products/x.jpg`, trình duyệt tự ghép với
domain Vercel. Ảnh admin upload sau này vẫn đi Cloudinary như thường.

**Đổi schema sau này** thì không dùng `synchronize` nữa mà phải:

```bash
# sửa entity, rồi:
npm run migration:generate     # sinh file migration mới
npm run migration:run          # chạy thử ở máy
git commit && git push         # Render tự chạy migration khi khởi động lại
```

**Đổi mật khẩu / khoá bí mật:** `JWT_SECRET` trên production phải khác ở máy.
Đổi khoá này sẽ làm mọi phiên đăng nhập hiện tại mất hiệu lực.
