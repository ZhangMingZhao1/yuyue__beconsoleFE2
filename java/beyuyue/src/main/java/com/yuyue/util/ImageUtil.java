package com.yuyue.util;
  
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.awt.image.DataBuffer;
import java.awt.image.DataBufferInt;
import java.awt.image.DirectColorModel;
import java.awt.image.PixelGrabber;
import java.awt.image.Raster;
import java.awt.image.RenderedImage;
import java.awt.image.WritableRaster;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
  
/**
 * 
 * @author 吴俭
 *
 */
public class ImageUtil {
  
	/**
	 * 
	 * @param f 传入的文件
	 * @return 返回修改为jpg后的图片
	 */
	public static BufferedImage change2jpg(File f) {
		try {
            Image i = Toolkit.getDefaultToolkit().createImage(f.getAbsolutePath());//获取图片资源
            PixelGrabber pg = new PixelGrabber(i, 0, 0, -1, -1, true);//获得图像像素子集的 ImageConsumer
            pg.grabPixels();//请求 Image 或 ImageProducer 开始传递像素，并等待传递完相关矩形中的所有像素
            int width = pg.getWidth(), height = pg.getHeight();//获取（调整图像高度后的）像素缓冲区的高度和宽度
            final int[] RGB_MASKS = { 0xFF0000, 0xFF00, 0xFF };
            final ColorModel RGB_OPAQUE = new DirectColorModel(32, RGB_MASKS[0], RGB_MASKS[1], RGB_MASKS[2]);//根据指定的指示 int 像素表示形式中哪些位包含红色、绿色和蓝色颜色样本的掩码构造 DirectColorModel
            DataBuffer buffer = new DataBufferInt((int[]) pg.getPixels(), pg.getWidth() * pg.getHeight());//获取像素缓冲区
            WritableRaster raster = Raster.createPackedRaster(buffer, width, height, width, RGB_MASKS, null);
            BufferedImage img = new BufferedImage(RGB_OPAQUE, raster, false, null);
            return img;
        } catch (InterruptedException e) {
            e.printStackTrace();
            return null;
        }
	}
  
	/**
	 * 用于改变图片大小，在上传产品图片的时候会用到
	 * @param srcFile 原始图片
	 * @param width 图片宽度
	 * @param height 图片高度
	 * @param destFile 生成图片
	 */
	public static void resizeImage(File srcFile, int width,int height, File destFile) {
        try {
            if(!destFile.getParentFile().exists())
                destFile.getParentFile().mkdirs();
            Image i = ImageIO.read(srcFile);
            i = resizeImage(i, width, height);
            ImageIO.write((RenderedImage) i, "jpg", destFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
     
	/**
	 * 用于改变图片大小，在上传产品图片的时候会用到
	 * @param srcImage 原始图片
	 * @param width
	 * @param height
	 * @return 改变后的图片
	 */
    public static Image resizeImage(Image srcImage, int width, int height) {
        try {
            BufferedImage buffImg = null;
            buffImg = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            buffImg.getGraphics().drawImage(srcImage.getScaledInstance(width, height, Image.SCALE_SMOOTH), 0, 0, null);
 
            return buffImg;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
  
}
	
