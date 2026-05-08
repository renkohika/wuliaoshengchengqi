"""
批量抠图脚本 - 去除边框图片的背景
使用 rembg 库进行 AI 抠图
"""
import os
from rembg import remove
from PIL import Image
from pathlib import Path

def batch_remove_background(input_dir, output_dir):
    """
    批量去除指定目录下所有图片的背景
    
    Args:
        input_dir: 输入图片目录
        output_dir: 输出图片目录（处理后保存的位置）
    """
    # 创建输出目录
    Path(output_dir).mkdir(parents=True, exist_ok=True)
    
    # 获取所有图片文件
    image_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.webp'}
    image_files = [
        f for f in os.listdir(input_dir) 
        if Path(f).suffix.lower() in image_extensions
    ]
    
    print(f"找到 {len(image_files)} 个图片文件")
    print("=" * 50)
    
    # 处理每个图片
    for i, filename in enumerate(image_files, 1):
        input_path = os.path.join(input_dir, filename)
        output_filename = Path(filename).stem + '.png'  # 输出为PNG格式以支持透明背景
        output_path = os.path.join(output_dir, output_filename)
        
        print(f"\n[{i}/{len(image_files)}] 处理: {filename}")
        
        try:
            # 打开图片
            with Image.open(input_path) as input_image:
                print(f"  - 原始尺寸: {input_image.size}")
                
                # 去除背景
                output_image = remove(input_image)
                print(f"  - 抠图完成")
                
                # 保存结果
                output_image.save(output_path, 'PNG')
                print(f"  - 已保存: {output_filename}")
                
        except Exception as e:
            print(f"  - 错误: {str(e)}")
    
    print("\n" + "=" * 50)
    print("批量处理完成！")
    print(f"输入目录: {input_dir}")
    print(f"输出目录: {output_dir}")

if __name__ == "__main__":
    # 配置路径
    script_dir = Path(__file__).parent
    input_directory = script_dir / "public" / "borders"
    output_directory = script_dir / "public" / "borders_processed"
    
    print("边框图片批量抠图工具")
    print("=" * 50)
    
    # 检查输入目录是否存在
    if not input_directory.exists():
        print(f"错误: 输入目录不存在: {input_directory}")
        exit(1)
    
    # 执行批量抠图
    batch_remove_background(str(input_directory), str(output_directory))
    
    print("\n提示: 处理后的图片已保存到 borders_processed 目录")
    print("请检查效果，如果满意，可以替换原 borders 目录中的文件")
