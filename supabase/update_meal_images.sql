-- Fix broken meal images and add the new dishes.
-- Safe to run more than once.

UPDATE public.meals SET image_url = 'https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=400' WHERE name = 'Bánh mì thịt';
UPDATE public.meals SET image_url = 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400' WHERE name = 'Xôi gà';
UPDATE public.meals SET image_url = 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=400' WHERE name = 'Tôm sú rang muối';
UPDATE public.meals SET image_url = 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?w=400' WHERE name = 'Cá basa chiên giòn';
UPDATE public.meals SET image_url = 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400' WHERE name = 'Bí đỏ luộc';
UPDATE public.meals SET image_url = 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400' WHERE name = 'Nho';
UPDATE public.meals SET image_url = 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=400' WHERE name = 'Dưa hấu';
UPDATE public.meals SET image_url = 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400' WHERE name = 'Bánh gạo lứt';
UPDATE public.meals SET image_url = 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400' WHERE name = 'Khoai lang luộc';
UPDATE public.meals SET image_url = 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400' WHERE name = 'Gỏi cuốn tôm thịt';
UPDATE public.meals SET image_url = 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400' WHERE name = 'Tôm luộc';

INSERT INTO public.meals (name, calories, protein_g, fats_g, carbs_g, meal_type, image_url)
SELECT v.name, v.calories, v.protein_g, v.fats_g, v.carbs_g, v.meal_type, v.image_url
FROM (
  VALUES
    ('Trứng luộc', 75, 6, 5, 1, 'breakfast', 'https://suckhoedoisong.qltns.mediacdn.vn/thumb_w/730/324455921873985536/2024/6/28/trung-luoc-17195964533531755427733.jpg'),
    ('Trứng ốp', 100, 6, 6, 1, 'breakfast', 'https://cdn.eva.vn/upload/4-2025/images/hank/khi-op-trung-dung-cho-luon-vao-chao-them-mot-buoc-nua-trung-khong-dinh-sat-hay-chay-vien-trung-op-gndg-ngoisaovn-w0-h-1762142088-946-width780height468.jpg'),
    ('Trứng rán', 100, 6, 7, 1, 'breakfast', 'https://media.phunutoday.vn/files/upload_images/2016/08/05/cach-ran-trung-ngon.jpg'),
    ('Sandwich', 130, 4, 2, 26, 'breakfast', 'https://www.tasteofhome.com/wp-content/uploads/2026/02/Chicken-Club-Sandwich_FT25_280733_EC_1202_5.jpg'),
    ('Mỳ ăn liền', 325, 7, 14, 50, 'breakfast', 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2021/2/23/883027/8899Be52-Mi-Tom-Trun.jpg'),
    ('Spaghetti', 500, 8, 15, 43, 'lunch', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNV6m6uOOanWWD1sEp-k6rDo0WKxTiZfrZUnDJ-LifWQI1N7p5r6HbpwGo&s=10'),
    ('Nước ép', 25, 2, 1, 7, 'morning_snack', 'https://media.vov.vn/sites/default/files/styles/large/public/2023-03/1_5_1.jpg'),
    ('Sinh tố', 225, 20, 4, 15, 'morning_snack', 'https://www.huongnghiepaau.com/wp-content/uploads/2022/07/mon-sinh-to-dao.jpg')
) AS v(name, calories, protein_g, fats_g, carbs_g, meal_type, image_url)
WHERE NOT EXISTS (
  SELECT 1 FROM public.meals m WHERE m.name = v.name
);
