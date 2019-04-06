package com.yuyue.web;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yuyue.pojo.BeUser;
import com.yuyue.service.BeUserService;
import com.yuyue.service.RsRolepermissionService;

@RestController
public class testController {

	@Autowired
	private BeUserService beUserService;
	
	@Autowired
	private RsRolepermissionService rsRolepermissionService;
	
	@GetMapping("/beUsers")
	public List<BeUser> listUser(){
		List<BeUser> bu = beUserService.list();
		rsRolepermissionService.setuRolepermission(bu);
		return bu;
	}
	
	@RequestMapping("test")
	public String test(HttpSession session) {
		System.out.println(session.getServletContext().getContextPath());
		return session.getServletContext().getRealPath("");
	}
	
}
