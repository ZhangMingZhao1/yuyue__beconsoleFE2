package com.yuyue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BsBookcolumnDAO;

@Service
public class BsBookcolumnService {

	@Autowired
	private BsBookcolumnDAO bsBookcolumnDAO;
	
}
