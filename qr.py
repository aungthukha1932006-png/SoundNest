import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image, ImageDraw, ImageFilter
qr = qrcode.QRCode(
    version=1,
    error_correction=ERROR_CORRECT_H, 
    box_size=10,
    border=4,
)
qr.add_data("https://aungthukha1932006-png.github.io/Lovemoe/index.html")  
qr.make(fit=True)

qr_img = qr.make_image(fill_color="deeppink", back_color="white").convert("RGBA")

bg = Image.new("RGBA", qr_img.size, (255, 192, 203, 255))
bg = bg.filter(ImageFilter.GaussianBlur(15))

final = Image.alpha_composite(bg, qr_img)


final.save("Qr.png")
print("✅ The QR has been saved as Qr.png")