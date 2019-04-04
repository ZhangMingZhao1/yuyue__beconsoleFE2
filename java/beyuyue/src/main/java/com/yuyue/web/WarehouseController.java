package com.yuyue.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yuyue.pojo.BsBookcaseinfo;
import com.yuyue.service.BsBookcaseinfoService;
import com.yuyue.util.Page4Navigator;

/**
 * 问题最多的地方
 * 仓库管理
 * @author 吴俭
 *
 */
@RestController
public class WarehouseController {
	
	@Autowired
	private BsBookcaseinfoService bsBookcaseinfoService;
	
	@GetMapping("/bookcaseinfos")
	public Page4Navigator<BsBookcaseinfo> listBookcaseinfo(@RequestParam(value = "start",defaultValue = "0")int start,
			@RequestParam(value="size",defaultValue="10")int size){
		start = start<0?0:start;
		return bsBookcaseinfoService.list(start, size, 5);
	}

}
