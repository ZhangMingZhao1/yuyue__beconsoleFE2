package com.yuyue.web;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.yuyue.pojo.BeSensitive;
import com.yuyue.pojo.BsUserdynamic;
import com.yuyue.pojo.BsUserinfo;
import com.yuyue.service.BeSensitiveService;
import com.yuyue.service.BsUserdynamicService;
import com.yuyue.service.BsUserdynamiccmntService;
import com.yuyue.service.BsUserinfoService;
import com.yuyue.util.Lists;
import com.yuyue.util.Page4Navigator;
import com.yuyue.util.Result;

/**
 * 鱼群管理
 * @author 吴俭
 *
 */
@RestController
public class ShoalController {

	@Autowired
	private BsUserinfoService bsUserinfoService;
	
	@Autowired
	private BsUserdynamicService bsUserdynamicService;
	
	@Autowired
	private BsUserdynamiccmntService bsUserdynamiccmntService;
	
	@Autowired
	private BeSensitiveService beSensitiveService;
	
	/**
	 * 用户信息集合
	 * @return
	 */
	@GetMapping("/userinfos")
	public List<BsUserinfo> listUser(){
		return bsUserinfoService.list();
	}
	
	/**
	 * 鱼群动态表 书籍
	 * @return
	 */
	@GetMapping("/bUserdynamics")
	public Page4Navigator<BsUserdynamic> listBUserdynamic(@RequestParam(name = "start",defaultValue="0") int start,
			@RequestParam(name = "size",defaultValue="10") int size, String bookName, String content, String userName,
			Date starttime, Date endtime){
		start = start>0?start:0;
		long time = System.currentTimeMillis();
		if(bookName == null)
			bookName = "";
		if(content == null)
			content = "";
		if(userName == null)
			userName = "";
		if(starttime == null)
			starttime = new Date(time/10);
		if(endtime == null)
			endtime = new Date(time);
		return bsUserdynamicService.list(start, size, 5, bookName, content, userName, starttime, endtime);
	}
	
	/**
	 * 鱼群动态表 评论
	 * @return
	 */
	@GetMapping("/pUserdynamic")
	public Page4Navigator<BsUserdynamic> listPUserdynamic(@RequestParam(name = "start",defaultValue="0") int start,
			@RequestParam(name = "size",defaultValue="10") int size, String content, String userName,
			Date starttime, Date endtime){
		start = start>0?start:0;
		long time = System.currentTimeMillis();
		if(content == null)
			content = "";
		if(userName == null)
			userName = "";
		if(starttime == null)
			starttime = new Date(time/10);
		if(endtime == null)
			endtime = new Date(time);
		return bsUserdynamicService.list(start, size, 5, content, userName, starttime, endtime);
	}
	
	/**
	 * 删除动态信息 会产生对应的级联删除
	 * @param lists
	 * @return
	 */
	@PostMapping(value = "/deleteUserdynamic")
	public Object deleteUserdynamic(@RequestBody Lists lists) {
		int size = lists.getDynamicIds().size();
		int flag = bsUserdynamicService.deletemore(lists.getDynamicIds());
		if(flag <= 0)
			return Result.fail("全部删除失败");
		if(flag != size)
			return Result.fail("删除失败"+(size-flag)+"条");
		return Result.success();
	}
	
	/**
	 * 删除动态评论
	 * @param lists
	 * @return
	 */
	@PostMapping(value = "/userdynamiccmnts")
	public Object deleteUserdynamiccmnt(@RequestBody Lists lists) {
		int size = lists.getCommentIds().size();
		int flag = bsUserdynamiccmntService.deletemore(lists.getCommentIds());
		if(flag <= 0)
			return Result.fail("全部删除失败");
		if(flag != size)
			return Result.fail("删除失败"+(size-flag)+"条");
		return Result.success();
	}
	
	/**
	 * 鱼群动态评论表
	 * @return
	 */
	@GetMapping("/userdynamiccmnts")
	public Object listUserdynamiccmnt(@RequestParam(name = "start",defaultValue="0") int start,
			@RequestParam(name = "size",defaultValue="10") int size, String content, String userName,
			Date starttime, Date endtime){
		start = start>0?start:0;
		long time = System.currentTimeMillis();
		if(content == null)
			content = "";
		if(userName == null)
			userName = "";
		if(starttime == null)
			starttime = new Date(time/10);
		if(endtime == null)
			endtime = new Date(time);
		return bsUserdynamiccmntService.list(start, size, 5, content, userName, starttime, endtime);
	}
	
	/**
	 * 获取某动态的动态评论表
	 * @param start
	 * @param size
	 * @param dynamicId
	 * @param content
	 * @param userName
	 * @param starttime
	 * @param endtime
	 * @return
	 */
	@GetMapping("/userdynamiccmnts/{dynamicId}")
	public Object listUserdynamiccmntByDynamicId(@RequestParam(name = "start",defaultValue="0") int start,
			@RequestParam(name = "size",defaultValue="10") int size, @PathVariable("dynamicId")String dynamicId, 
			String content, String userName, Date starttime, Date endtime) {
		start = start>0?start:0;
		long time = System.currentTimeMillis();
		BsUserdynamic bu = bsUserdynamicService.getUserdynamic(dynamicId);
		if(bu == null)
			return Result.fail("此评论不存在");
		if(content == null)
			content = "";
		if(userName == null)
			userName = "";
		if(starttime == null)
			starttime = new Date(time/10);
		if(endtime == null)
			endtime = new Date(time);
		return bsUserdynamiccmntService.findByDynamicId(start, size, 5, dynamicId, content, userName, starttime, endtime);
	}
	
	/**
	 * 展现敏感词库
	 * @return
	 */
	@GetMapping("/sensitives")
	public List<BeSensitive> listSensitive(){
		return beSensitiveService.list();
	}
	
	/**
	 * 增加敏感词
	 * @param words
	 * @return
	 * @throws IOException
	 */
	/*@PostMapping(value="addSensitive")
	public Object addSensitive(@RequestBody ArrayList<BeSensitive> words) throws IOException{
		if(words.isEmpty())
			return Result.fail("请输入增加的词");
		int size = words.size();
		int flag = beSensitiveService.addSensitives(words);
		if(size != flag)
			return Result.fail("添加失败"+(size-flag)+"个");
		return Result.success();
	}*/
	
	/**
	 * 增加敏感词库
	 * @param words
	 * @return
	 */
	@PostMapping(value="sensitives")
	public Object addSensitive(@RequestBody BeSensitive words) throws IOException{
		if(words == null)
			return Result.fail("请输入增加的词");
		int flag = beSensitiveService.addSensitive(words);
		if(flag <= 0)
			return Result.fail("添加失败");
		return Result.success(flag);
	}
	
	/**
	 * 删除敏感词库
	 * @param id
	 * @return
	 */
	@DeleteMapping("/sensitives/{id}")
	public Object deleteSensitive(@PathVariable("id")int id) {
		int flag = beSensitiveService.deleteSensitive(id);
		if(flag <= 0)
			return Result.fail("删除失败");
		return Result.success();
	}
	
}
