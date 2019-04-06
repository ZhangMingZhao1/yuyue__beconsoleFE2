package com.yuyue.web;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yuyue.pojo.BsBookinfo;
import com.yuyue.pojo.BsBookinstore;
import com.yuyue.pojo.BsPublishinfo;
import com.yuyue.service.BsBookinfoService;
import com.yuyue.service.BsBookinstoreService;
import com.yuyue.service.BsPublishinfoService;
import com.yuyue.util.Page4Navigator;
import com.yuyue.util.Result;

/**
 * 商品管理操作部分还没实现  书籍新增和修改的图片上传还没写  查询已经实现
 * 书籍管理
 * @author 吴俭
 *
 */
@RestController
public class BookController {
	
	private static Logger log = LoggerFactory.getLogger(BookController.class);

	@Autowired
	private BsBookinfoService bsBookinfoService;
	
	@Autowired
	private BsPublishinfoService bsPublishinfoService;
	
	@Autowired
	private BsBookinstoreService  bsBookinstoreService;
	
	/**
	 * 数目库信息查询
	 * @param start
	 * @param size
	 * @return
	 */
	@GetMapping(value="/bookinfos")
	public Page4Navigator<BsBookinfo> listBookinfos(@RequestParam(value = "start", defaultValue = "0") int start,
			@RequestParam(value = "size", defaultValue = "10") int size,
			@RequestParam(value = "keyword", defaultValue = "")String keyword){
		start = start<0?0:start;
		Page4Navigator<BsBookinfo> bbis = bsBookinfoService.list(start,size,5,keyword);
		bsBookinstoreService.setBsBookinstore(bbis.getContent());
		log.info("wujian"+"增加了书籍信息");
		return bbis;
	}
	
	/**
	 * 获取某书信息
	 * @param bookinfoId
	 * @return
	 */
	@GetMapping("/bookinfos/{bookinfoId}")
	public Object getBookinfo(@PathVariable("bookinfoId")int bookinfoId) throws Exception {
		if(bookinfoId == 0 )
			return Result.fail("请输入书籍bookinfo");
		BsBookinfo bbi = bsBookinfoService.getBook(bookinfoId);
		if(bbi == null)
			return Result.fail("没有此书籍");
		return bbi;
	}
	
	/**
	 * 增加书籍
	 * @param bbi
	 * @return
	 */
	@PostMapping(value="/bookinfos")
	public Object addBookinfo(@RequestBody BsBookinfo bbi) throws IOException{
		if(bbi == null)
			return Result.fail("未获取到输入值");
		if(!(bbi.getBookinfoId() >0))
			return Result.fail("请输入正确的bookinfoId");
		int flag = bsBookinfoService.addbook(bbi);
		if(flag <=0)
			return Result.fail("添加失败");
		return Result.success();
	}
	
	/**
	 * 更新书籍
	 * @param bbi
	 * @return
	 */
	@PutMapping(value="/bookinfos")
	public Object updateBookinfo(@RequestBody BsBookinfo bbi) throws IOException{
		if(bbi == null)
			return Result.fail("未获取到输入值");
		if(!(bbi.getBookinfoId()>0))
			return Result.fail("请输入正确的bookinfoId");
		int flag = bsBookinfoService.updateBook(bbi);
		if(flag <=0)
			return Result.fail("更新失败");
		return Result.success();
	}
	
	/**
	 * 出版社维护信息集合
	 * @param start
	 * @param size
	 * @return
	 */
	@GetMapping("/publishinfos")
	public Page4Navigator<BsPublishinfo> listPublishinfo(@RequestParam(value = "start",defaultValue = "0") int start,
			@RequestParam(value="size",defaultValue="10")int size,
			@RequestParam(value = "keyword", defaultValue = "")String keyword){
		start = start<0?0:start;
		return bsPublishinfoService.list(start, size, 5, keyword);
	}
	
	/**
	 * 获得出版社维护信息
	 * @param pubId
	 * @return
	 */
	@GetMapping("/publishinfos/{pubId}")
	public Object getPublishinfo(@PathVariable("pubId")int pubId) {
		if(pubId == 0)
			return Result.fail("请输入出版社pubId");
		BsPublishinfo bpi = bsPublishinfoService.getPublishinfo(pubId);
		if(bpi == null)
			return Result.fail("此出版社不存在");
		return bpi;
	}
	
	/**
	 * 添加出版社信息
	 * @param bpi
	 * @return
	 */
	@PostMapping(value = "/publishinfos")
	public Object addPublishinfo(@RequestBody BsPublishinfo bpi) throws IOException{
		if(bpi == null)
			return Result.fail("未获取到输入值");
		if(!(bpi.getPubId()>0))
			return Result.fail("请输入正确的pubId");
		int flag = bsPublishinfoService.addPublishinfo(bpi);
		if(flag <=0)
			return Result.fail("添加失败");
		return Result.success();
	}
	
	/**
	 * 更新出版社信息
	 * @param bpi
	 * @return
	 */
	@PutMapping(value="/publishinfos")
	public Object updatePublishinfo(@RequestBody BsPublishinfo bpi) throws IOException{
		if(bpi == null)
			return Result.fail("未获取到输入值");
		if(!(bpi.getPubId() >0))
			return Result.fail("请输入正确的pubId");
		int flag = bsPublishinfoService.updatePublishinfo(bpi);
		if(flag <=0)
			return Result.fail("更新失败");
		return Result.success();
	}
	
	/**
	 * 删除出版社信息
	 * @param pubId
	 * @return
	 */
	@DeleteMapping("/publishinfos/{pubId}")
	public Object deletePublishinfo(@PathVariable("pubId")int pubId) {
		if(pubId <= 0)
			return Result.fail("请输入正确的pubId");
		int flag = bsPublishinfoService.deletePublishinfo(pubId);
		if(flag <= 0)
			return Result.fail("删除失败");
		return Result.success();
	}
	
	/**
	 * 商品管理集合
	 * @param start
	 * @param size
	 * @return
	 */
	@GetMapping("/bookinstores")
	public Page4Navigator<BsBookinstore> listBsBookinstore(@RequestParam(value="start", defaultValue="0")int start, 
			@RequestParam(value="size",defaultValue="10")int size,
			@RequestParam(value = "keyword", defaultValue = "")String keyword){
		start = start<0?0:start;
		return bsBookinstoreService.list(start, size, 5, keyword);
	}
	
}
