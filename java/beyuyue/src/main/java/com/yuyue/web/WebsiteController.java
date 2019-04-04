package com.yuyue.web;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.yuyue.pojo.BsBookcategory;
import com.yuyue.pojo.BsBookinfo;
import com.yuyue.pojo.BsBooksubject;
import com.yuyue.pojo.BsPicture;
import com.yuyue.pojo.RsBookinsubject;
import com.yuyue.service.BsBookcategoryService;
import com.yuyue.service.BsBookinfoService;
import com.yuyue.service.BsBooksubjectService;
import com.yuyue.service.BsPictureService;
import com.yuyue.service.RsBookinsubjectService;
import com.yuyue.util.ImageUtil;
import com.yuyue.util.Page4Navigator;
import com.yuyue.util.Result;

/**
 * banner管理和广告管理没做 网站管理
 * 
 * @author 吴俭
 *
 */
@RestController
public class WebsiteController {

	private String path = "119.3.231.3:8080/yuyue/img/";
	@Autowired
	private BsBooksubjectService bsBooksubjectService;

	@Autowired
	private RsBookinsubjectService rsBookinsubjectService;

	@Autowired
	private BsBookcategoryService bsBookcategoryService;

	@Autowired
	private BsPictureService bsPictureService;

	@Autowired
	private BsBookinfoService bsBookinfoService;

	/**
	 * 专题设置
	 * 
	 * @param start
	 * @param size
	 * @return
	 */
	@GetMapping("/booksubjects")
	public Page4Navigator<BsBooksubject> subject(@RequestParam(value = "start", defaultValue = "0") int start,
			@RequestParam(value = "size", defaultValue = "5") int size) {
		start = start < 0 ? 0 : start;
		return bsBooksubjectService.list(start, size, 5);
	}

	/**
	 * 增加专题
	 * 
	 * @param bsBooksubject
	 * @return
	 */
	@PostMapping(value = "/booksubjects")
	public Object addSubject(@RequestBody BsBooksubject bsBooksubject) throws IOException {
		if (bsBooksubject == null)
			return Result.fail("未获取到输入值");
		bsBooksubject.setCreateTime(new Date());
		bsBooksubject.setLimitNum(5);
		int flag = bsBooksubjectService.addSubject(bsBooksubject);
		if (flag <= 0)
			return Result.fail("增加失败");
		return Result.success();
	}

	/**
	 * 更新专题
	 * 
	 * @param bsBooksubject
	 * @return
	 */
	@PutMapping(value = "/booksubject")
	public Object updateSubject(@RequestBody BsBooksubject bsBooksubject) throws IOException {
		if (bsBooksubject == null)
			return Result.fail("未获取到输入值");
		if (bsBooksubject.getBooksubjectId() <= 0)
			return Result.fail("请输入正确的booksubjectId");
		BsBooksubject bbs = bsBooksubjectService.getSubject(bsBooksubject.getBooksubjectId());
		bbs.setSort(bsBooksubject.getSort());
		bbs.setSubjectName(bsBooksubject.getSubjectName());
		bbs.setIsShow(bsBooksubject.getIsShow());
		bbs.setUpdateTime(new Date());
		int flag = bsBooksubjectService.updateSubject(bbs);
		if (flag <= 0)
			return Result.fail("更新失败");
		return Result.success();
	}

	/**
	 * 删除专题
	 * 
	 * @param booksubjectId
	 * @return
	 */
	@DeleteMapping("/booksubjects/{booksubjectId}")
	public Object deleteSubject(@PathVariable("booksubjectId")int booksubjectId) {
		int flag = bsBooksubjectService.deleteSubject(booksubjectId);
		if (flag <= 0)
			return Result.fail("删除失败");
		return Result.success();
	}

	/**
	 * 获得专题内容
	 * 
	 * @param bsBooksubject
	 * @return
	 */
	@GetMapping("/bookinsubjects/{booksubjectId}")
	public Object getBooks(@PathVariable("booksubjectId")int booksubjectId) {
		BsBooksubject bsBooksubject = new BsBooksubject();
		bsBooksubject.setBooksubjectId(booksubjectId);
		HashMap<String, Object> map = new HashMap<>();
		List<RsBookinsubject> rbss = rsBookinsubjectService.getByBsBooksubject(bsBooksubject);
		BsBooksubject subject = bsBooksubjectService.getSubject(bsBooksubject.getBooksubjectId());
		map.put("subject", subject);
		map.put("list", rbss);
		return map;
	}

	/**
	 * 删除专题与书籍的关系
	 * 
	 * @param bookinsubjectId
	 * @return
	 */
	@DeleteMapping("/bookinsubjects/{bookinsubjectId}")
	public Object deleteBookinsubject(@PathVariable("bookinsubjectId")int bookinsubjectId) throws IOException {
		int flag = rsBookinsubjectService.delete(bookinsubjectId);
		if (flag <= 0)
			return Result.fail("删除失败");
		return Result.success();
	}

	/**
	 * 书籍分类和及其子分类
	 * 
	 * @return
	 */
	@GetMapping("/bookcategories")
	public Object listBookcategory() {
		return bsBookcategoryService.list();
	}

	/**
	 * 获得书籍
	 * @param bsBookcategory
	 * @param bookName
	 * @return
	 */
	@GetMapping("/bookinfo/{categoryId}")
	public Object getByCategoryAndBookName(@PathVariable("categoryId")String categoryId,
			@RequestParam(value = "bookName", defaultValue = "") String bookName) {
		if (categoryId == null||Integer.parseInt(categoryId)<=0)
			return Result.fail("分类id出错，查询失败");
		BsBookcategory bsBookcategory = new BsBookcategory();
		bsBookcategory.setCategoryId(categoryId);
		return bsBookinfoService.getByBookcategoryAndBookName(bsBookcategory, bookName);
	}

	/**
	 * bsBookinfoId bsBooksubjectId 增加书籍和主题的关系
	 * 
	 * @param rsBookinsubject
	 * @return
	 */
	@PostMapping("/bookinsubjects")
	public Object addBookinsubject(@RequestBody BsBookinfo bsBookinfo, @RequestBody BsBooksubject bsBooksubject) {
		if (bsBookinfo == null || bsBooksubject == null)
			return Result.fail("未获取到输入值");
		RsBookinsubject rsBookinsubject = new RsBookinsubject();
		rsBookinsubject.setBsBookinfo(bsBookinfo);
		rsBookinsubject.setBsBooksubject(bsBooksubject);
		int flag = rsBookinsubjectService.addBookinsubject(rsBookinsubject);
		if (flag <= 0)
			return Result.fail("增加失败");
		return Result.success();
	}

	/**
	 * banner管理
	 * 
	 * @param start
	 * @param size
	 * @return
	 */
	@GetMapping("/pictures")
	public Page4Navigator<BsPicture> listPicture(@RequestParam(value = "start", defaultValue = "0") int start,
			@RequestParam(value = "size", defaultValue = "10") int size) {
		return bsPictureService.list(start, size, 5);
	}

	/**
	 * 添加banner
	 * @param image
	 * @param bsPicture
	 * @param request
	 * @return
	 * @throws IOException
	 */
	@PostMapping("/pictures")
	public Object addPicture(MultipartFile image, @RequestBody BsPicture bsPicture) throws IOException {
		saveOrUpdateOrDeleteImageFile(image, bsPicture, 1);
		int flag = bsPictureService.add(bsPicture);
		if (flag <= 0)
			return Result.fail("增加失败");
		return Result.success();
	}

	/**
	 * 删除banner
	 * @param picId
	 * @return
	 * @throws IOException
	 */
	@DeleteMapping("/pictures/{picId}")
	public Object deletePicture(@PathVariable("picId") int picId) throws IOException {
		BsPicture bp = bsPictureService.get(picId);
		saveOrUpdateOrDeleteImageFile(null, bp, 3);
		int flag = bsPictureService.delete(picId);
		if (flag <= 0)
			return Result.fail("删除失败");
		return Result.success();
	}

	/**
	 * 更新banner
	 * @param bsPicture
	 * @param image
	 * @return
	 * @throws IOException
	 */
	@PutMapping("/updatePicture")
	public Object updatePicture(@RequestBody BsPicture bsPicture, MultipartFile image) throws IOException {
		saveOrUpdateOrDeleteImageFile(image, bsPicture, 2);
		int flag = bsPictureService.add(bsPicture);
		if (flag <= 0)
			return Result.fail("更新失败");
		return Result.success();
	}

	/**
	 * @param image 图片资源
	 * @param bsPicture pojo
	 * @param size 1-增加 2-更新 3-删除
	 * @throws IOException
	 */
	public void saveOrUpdateOrDeleteImageFile(MultipartFile image, BsPicture bsPicture, int size) throws IOException {
		if (size == 1) {
			String fileName = new Date().getTime() + (int) (Math.random() * 100) + ".jpg";
			File file = new File("priture/" + fileName);
			if (!file.getParentFile().exists())
				file.getParentFile().mkdirs();

			if (image != null) {
				image.transferTo(file);
				BufferedImage img = ImageUtil.change2jpg(file);
				ImageIO.write(img, "jpg", file);
				bsPicture.setPicUrl(path + "pciture/" + fileName);
			} else
				bsPicture.setPicUrl("暂无图片");

		} else if (size == 2) {
			String fileName = bsPicture.getPicUrl();
			if (!fileName.equals("暂无图片")) {
				File file = new File(fileName.split(path)[1]);
				file.delete();
			}
			fileName = new Date().getTime() + (int) (Math.random() * 100) + ".jpg";
			File file = new File("priture/" + fileName);
			if (!file.getParentFile().exists())
				file.getParentFile().mkdirs();
			if (image != null) {
				image.transferTo(file);
				BufferedImage img = ImageUtil.change2jpg(file);
				ImageIO.write(img, "jpg", file);
				bsPicture.setPicUrl(path + "pciture/" + fileName);
			} else
				bsPicture.setPicUrl("暂无图片");
		} else if (size == 3) {
			String fileName = bsPicture.getPicUrl();
			if (!fileName.equals("暂无图片")) {
				File file = new File(fileName.split(path)[1]);
				file.delete();
			}
		}

	}

}
