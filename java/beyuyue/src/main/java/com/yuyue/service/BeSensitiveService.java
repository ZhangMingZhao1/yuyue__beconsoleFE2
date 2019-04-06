package com.yuyue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BeSensitiveDAO;
import com.yuyue.pojo.BeSensitive;

@Service
public class BeSensitiveService {

	@Autowired
	private BeSensitiveDAO beSensitiveDAO;
	
	public List<BeSensitive> list(){
		return beSensitiveDAO.findAll();
	}
	
	public int addSensitives(List<BeSensitive> words) {
		int i = 0;
		for(BeSensitive word : words) {
			int id = addSensitive(word);
			if(id > 0)
				i++;
		}
		return i;	
	}
	
	public int addSensitive(BeSensitive word) {
		BeSensitive bs = beSensitiveDAO.save(word);
		return bs.getId();
	}
	
	public int addSensitive(String word) {
		BeSensitive bs = new BeSensitive();
		bs.setWord(word);
		bs = beSensitiveDAO.save(bs);
		return bs.getId();
	}
	
	public int deleteSensitive(int id) {
		try {
			beSensitiveDAO.delete(id);
			return 1;
		} catch (Exception e) {
			return 0;
		}
	}
	
}
