import os
from rembg import remove
from PIL import Image

def process_car_images(input_folder, output_folder):
    """
    Klasördeki araba fotoğraflarının arkaplanını tamamen temizler ve şeffaf PNG yapar.
    Ayrıca görselin etrafındaki şeffaf boşlukları (bbox) otomatik olarak kırparak aracı ortalar.
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(input_folder):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, os.path.splitext(filename)[0] + "_transparent.png")
            
            print(f"İşleniyor: {filename}...")
            try:
                # Orijinal resmi aç
                input_image = Image.open(input_path)
                
                # Arkaplanı rembg algoritması ile kaldır (Alpha channel PNG döndürür)
                output_image = remove(input_image)
                
                # Aracın etrafındaki gereksiz şeffaf (boş) alanları kırp (Auto-Crop)
                bbox = output_image.getbbox()
                if bbox:
                    output_image = output_image.crop(bbox)
                
                # Şeffaf PNG olarak kaydet
                output_image.save(output_path, "PNG")
                print(f"✅ Başarılı: {output_path}")
            except Exception as e:
                print(f"❌ Hata ({filename}): {e}")

if __name__ == "__main__":
    # Kullanım Örneği
    # pip install rembg pillow
    INPUT_DIR = "./raw_cars"
    OUTPUT_DIR = "./processed_cars"
    process_car_images(INPUT_DIR, OUTPUT_DIR)
