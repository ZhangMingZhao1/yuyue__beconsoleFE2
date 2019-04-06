package com.yuyue.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yuyue.dao.BeInstitutionDAO;
import com.yuyue.pojo.BeInstitution;

@Service
public class BeInstitutionService {

	@Autowired
	private BeInstitutionDAO beInstitutionDAO;
	
	public List<BeInstitution> list(){
		List<BeInstitution> bits = beInstitutionDAO.findByLever(1);
		getBeInstitutionByParent(bits);
		for(BeInstitution bis : bits)
			getBeInstitutionByParent(bis.getBeInstitutions());
		return bits;
	}
	
	public void getBeInstitutionByParent(BeInstitution beInstitution) {
		List<BeInstitution> bits = beInstitutionDAO.findByBeInstitution(beInstitution);
		beInstitution.setBeInstitutions(bits);
	}
	
	public void getBeInstitutionByParent(List<BeInstitution> bits) {
		for(BeInstitution bis : bits)
			getBeInstitutionByParent(bis);
	}
	
}
