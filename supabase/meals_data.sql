-- Insert sample meal data into the meals table
-- Run this in Supabase SQL Editor after running setup_steps.sql

-- Vietnamese Breakfast Meals
INSERT INTO public.meals (name, calories, protein_g, fats_g, carbs_g, meal_type, image_url) VALUES
('Phở bò', 350, 20, 8, 50, 'breakfast', 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400'),
('Bánh mì thịt', 400, 15, 18, 45, 'breakfast', 'https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=400'),
('Xôi gà', 380, 18, 12, 52, 'breakfast', 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400'),
('Bún bò Huế', 420, 22, 14, 55, 'breakfast', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400'),
('Cháo gà', 250, 15, 5, 35, 'breakfast', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'),
('Bánh cuốn', 280, 12, 6, 42, 'breakfast', 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400'),
('Yến mạch trộn sữa chua không đường và hạt chia', 300, 10, 8, 45, 'breakfast', 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400'),
('Bánh mì trứng ốp la', 350, 14, 16, 38, 'breakfast', 'https://images.unsplash.com/photo-1619895092538-128341789043?w=400'),
('Cơm tấm sườn nướng', 450, 25, 18, 48, 'breakfast', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400'),
('Hủ tiếu Nam Vang', 380, 18, 10, 52, 'breakfast', 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400'),

-- Lunch & Main Dishes
('Cơm gạo lứt', 216, 5, 2, 45, 'lunch', 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400'),
('Cơm trắng', 205, 4, 0, 45, 'lunch', 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400'),
('Cá thu kho nhạt', 280, 35, 12, 5, 'lunch', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400'),
('Cá hồi hấp xì dầu', 320, 38, 15, 3, 'lunch', 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400'),
('Thịt kho trứng', 380, 28, 22, 15, 'lunch', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400'),
('Gà luộc', 165, 31, 4, 0, 'lunch', 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'),
('Thịt bò xào rau củ', 320, 28, 18, 12, 'lunch', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400'),
('Canh chua cá lóc', 180, 20, 5, 15, 'lunch', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'),
('Đậu phụ sốt cà chua', 210, 12, 10, 18, 'lunch', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400'),
('Cá diêu hồng hấp xì dầu', 290, 36, 13, 4, 'lunch', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400'),
('Thịt gà nướng mật ong', 310, 32, 14, 12, 'lunch', 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'),
('Bò lúc lắc', 380, 30, 22, 10, 'lunch', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400'),
('Tôm sú rang muối', 240, 28, 12, 5, 'lunch', 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400'),
('Sườn heo nướng', 420, 32, 28, 8, 'lunch', 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400'),
('Cá basa chiên giòn', 260, 30, 12, 8, 'lunch', 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400'),

-- Vegetables & Side Dishes
('Súp lơ luộc', 55, 4, 1, 10, 'lunch', 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400'),
('Rau muống xào tỏi', 85, 3, 5, 8, 'lunch', 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400'),
('Cải xào nấm', 95, 4, 6, 7, 'lunch', 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400'),
('Bí đỏ luộc', 82, 2, 0, 20, 'lunch', 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400'),
('Đậu que xào', 70, 3, 4, 6, 'lunch', 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400'),
('Su su luộc', 39, 1, 0, 9, 'lunch', 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400'),
('Cà chua bi', 27, 1, 0, 6, 'lunch', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400'),
('Dưa leo', 16, 1, 0, 4, 'lunch', 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400'),

-- Soups
('Canh rau ngót thịt bằm', 120, 8, 5, 10, 'lunch', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'),
('Canh bí đỏ', 90, 2, 2, 18, 'lunch', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'),
('Canh chua tôm', 140, 12, 4, 15, 'lunch', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'),
('Súp gà nấm', 180, 15, 8, 12, 'lunch', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'),

-- Snacks (Morning & Afternoon)
('Táo', 95, 0, 0, 25, 'morning_snack', 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400'),
('Chuối', 105, 1, 0, 27, 'morning_snack', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400'),
('Cam', 62, 1, 0, 15, 'morning_snack', 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400'),
('Nho', 104, 1, 0, 27, 'morning_snack', 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400'),
('Dâu tây', 49, 1, 0, 12, 'morning_snack', 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400'),
('Dưa hấu', 46, 1, 0, 12, 'morning_snack', 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400'),
('Đu đủ', 59, 1, 0, 15, 'morning_snack', 'https://images.unsplash.com/photo-1617112848923-cc2234396a8d?w=400'),
('Bơ', 240, 3, 22, 13, 'morning_snack', 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400'),
('Hạt hạnh nhân', 164, 6, 14, 6, 'morning_snack', 'https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=400'),
('Hạt điều', 157, 5, 12, 9, 'morning_snack', 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400'),
('Sữa chua Hy Lạp không đường', 100, 10, 0, 6, 'morning_snack', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400'),
('Phô mai que', 80, 6, 6, 1, 'morning_snack', 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400'),

-- Afternoon Snacks
('Bánh gạo lứt', 35, 1, 0, 7, 'afternoon_snack', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400'),
('Bánh quy yến mạch', 68, 1, 2, 10, 'afternoon_snack', 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400'),
('Ngô luộc', 96, 3, 1, 21, 'afternoon_snack', 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400'),
('Khoai lang luộc', 103, 2, 0, 24, 'afternoon_snack', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400'),

-- Dinner (lighter options)
('Salad trộn', 150, 8, 10, 10, 'dinner', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400'),
('Gà nướng lá chanh', 280, 35, 12, 3, 'dinner', 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'),
('Cá áp chảo', 240, 32, 10, 4, 'dinner', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400'),
('Đậu hũ non hấp', 140, 12, 8, 6, 'dinner', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400'),
('Canh bầu tôm', 110, 10, 3, 12, 'dinner', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'),
('Gỏi cuốn tôm thịt', 180, 14, 6, 18, 'dinner', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400'),
('Cá hấp gừng', 200, 28, 8, 2, 'dinner', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400'),
('Tôm luộc', 140, 26, 2, 2, 'dinner', 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400'),
('Canh cải thảo', 45, 2, 1, 8, 'dinner', 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400'),
('Mực xào cần tỏi', 220, 24, 10, 8, 'dinner', 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=400'),

-- Additional meals
('Trứng luộc', 75, 6, 5, 1, 'breakfast', 'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/730/324455921873985536/2024/6/28/trung-luoc-17195964533531755427733.jpg'),
('Trứng ốp', 100, 6, 6, 1, 'breakfast', 'https://cdn.eva.vn/upload/4-2025/images/hank/khi-op-trung-dung-cho-luon-vao-chao-them-mot-buoc-nua-trung-khong-dinh-sat-hay-chay-vien-trung-op-gndg-ngoisaovn-w0-h-1762142088-946-width780height468.jpg'),
('Trứng rán', 100, 6, 7, 1, 'breakfast', 'https://media.phunutoday.vn/files/upload_images/2016/08/05/cach-ran-trung-ngon.jpg'),
('Sandwich', 130, 4, 2, 26, 'breakfast', 'https://www.tasteofhome.com/wp-content/uploads/2026/02/Chicken-Club-Sandwich_FT25_280733_EC_1202_5.jpg'),
('Mỳ ăn liền', 325, 7, 14, 50, 'breakfast', 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/2/23/883027/8899Be52-Mi-Tom-Trun.jpg'),
('Spaghetti', 500, 8, 15, 43, 'lunch', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNV6m6uOOanWWD1sEp-k6rDo0WKxTiZfrZUnDJ-LifWQI1N7p5r6HbpwGo&s=10'),
('Nước ép', 25, 2, 1, 7, 'morning_snack', 'https://media.vov.vn/sites/default/files/styles/large/public/2023-03/1_5_1.jpg'),
('Sinh tố', 225, 20, 4, 15, 'morning_snack', 'https://www.huongnghiepaau.com/wp-content/uploads/2022/07/mon-sinh-to-dao.jpg');

-- Log completion
SELECT 'Meals data inserted successfully! Total meals: ' || count(*)::text
FROM public.meals;
