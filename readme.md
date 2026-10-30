# Nutri Share

Ứng dụng theo dõi dinh dưỡng và sức khỏe trên React Native (Expo). Người dùng đăng ký, ghi nhật ký ăn uống, nước, cân nặng, tập luyện và giấc ngủ, xem bài viết sức khỏe, nhận thông báo và trò chuyện với trợ lý AI.

Tên hiển thị: **Nutri Share** (`NutriShare` trong `app.json`). Package: `com.nutri.share`.

---

## Tính năng

- Đăng ký, đăng nhập email, quên mật khẩu và thiết lập hồ sơ (chiều cao, cân nặng, mục tiêu).
- Trang chủ theo ngày: calo, tiến độ, nước uống và chỉ số sức khỏe.
- Ghi bữa ăn (sáng, trưa, tối, ăn nhẹ), tập luyện và giấc ngủ.
- Bài viết sức khỏe và lưu bài viết.
- Thông báo realtime.
- Chat sức khỏe dùng Google Gemini.
- Ảnh đại diện lưu trên Supabase Storage.

---

## Công nghệ

| Thành phần | Công nghệ |
|------------|-----------|
| App | React Native, Expo SDK 53, Expo Router, TypeScript |
| Giao diện | NativeWind (Tailwind) |
| Dữ liệu client | React Query, Zustand, Redux Toolkit |
| Form | React Hook Form, Zod |
| Backend | Supabase (Auth, PostgreSQL, Realtime, Storage) |
| Chat | Google Gemini (`@google/generative-ai`) |

---

## Yêu cầu

| Công cụ | Ghi chú |
|---------|---------|
| Node.js 18 hoặc 20 LTS | Kèm npm 9 trở lên |
| Git | Clone mã nguồn |
| Tài khoản Supabase | [supabase.com](https://supabase.com) |
| Expo Go | Mở bản dev bằng QR (tùy chọn) |
| Xcode | Chỉ khi chạy `npm run ios` trên Mac |
| Android Studio | Chỉ khi chạy `npm run android` |

---

## Cài đặt

```bash
git clone <url-repo> nutri-share
cd nutri-share
npm install
```

---

## Cấu hình môi trường

Copy file mẫu rồi điền key của project Supabase mới:

```bash
cp .env.example .env
```

```env
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key_here
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_key
```

- **Project URL** và **anon key**: Supabase Dashboard → Project Settings → API. Chỉ dùng anon key trên client, không đưa `service_role` vào app.
- **Gemini**: lấy tại [Google AI Studio](https://aistudio.google.com/apikey). Cần key này để dùng chat sức khỏe.

Client Supabase hiện đọc URL và anon key trong `src/lib/supabase.ts`. Khi đổi sang project mới, cập nhật hai giá trị đó cho khớp `.env`, rồi khởi động lại Expo (`npx expo start -c` nếu env không áp dụng).

Không commit file `.env`.

---

## Setup Supabase

Tạo project trên Supabase, bật **Email** trong Authentication → Providers. Muốn đăng ký xong dùng ngay trên môi trường dev thì tắt **Confirm email**.

Mở **SQL Editor** và chạy từng file trong `supabase/` theo thứ tự. Hướng dẫn chi tiết, lỗi thường gặp và checklist nằm ở [`supabase/HUONG_DAN_SETUP.md`](supabase/HUONG_DAN_SETUP.md).

| # | File | Việc nó làm |
|---|------|-------------|
| 1 | `schema.sql` | Schema gốc cho project trống. Bỏ dòng `alter table auth.users enable row level security` nếu báo `must be owner of table users` |
| 2 | `grant_table_permissions.sql` | Cấp quyền bảng, tránh lỗi `42501` |
| 3 | `add_exercise_sleep_tables.sql` | Tập luyện và giấc ngủ |
| 4 | `add_meal_type_column.sql` | Cột `meal_type` trên `meal_logs` |
| 5 | `notifications_schema.sql` | Thông báo |
| 6 | `add_notification_triggers.sql` | Trigger thông báo |

Sau bước 6, chạy một lần:

```sql
DROP TRIGGER IF EXISTS create_notification_settings_trigger ON public.profiles;
```

| # | File |
|---|------|
| 7 | `enable_realtime_notifications.sql` |
| 8 | `fix_meal_logs_policy.sql` |
| 9 | `create_profiles_storage_bucket.sql` |
| 10 | `storage_policies.sql` |
| 11 | `meals_data.sql` |
| 12 | `seed_articles_simple.sql` |

`setup_steps.sql` dùng khi cần xóa và tạo lại bảng cơ bản (có `DROP TABLE`). Không chạy song song với `schema.sql` trên cùng một database đã có dữ liệu.

---

## Chạy ứng dụng

```bash
npm start
```

- Expo Go: quét QR.
- Simulator: nhấn `i` (iOS) hoặc `a` (Android).

```bash
npm run ios
npm run android
npm run web
```

Sau khi chạy, đăng ký một tài khoản rồi kiểm tra trên Supabase: **Authentication → Users** có user mới, **Table Editor → `profiles`** có một dòng cùng `id`.

---

## Lỗi thường gặp

| Triệu chứng | Cách xử lý |
|-------------|------------|
| `must be owner of table users` khi chạy `schema.sql` | Bỏ dòng `alter table auth.users ...` rồi chạy phần còn lại |
| `permission denied` / `42501` | Chạy `grant_table_permissions.sql` và đảm bảo đã đăng nhập |
| Không có dòng `profiles` sau đăng ký | Xem Database → Logs, trigger `on_auth_user_created` |
| Upload avatar `Bucket not found` | Chạy `create_profiles_storage_bucket.sql` rồi `storage_policies.sql` |
| Không xóa được meal log | Chạy `fix_meal_logs_policy.sql` |
| Thông báo realtime không tới | Chạy `enable_realtime_notifications.sql` |
| App vẫn nối project Supabase cũ | Sửa URL và anon key trong `src/lib/supabase.ts`, rồi `npx expo start -c` |
