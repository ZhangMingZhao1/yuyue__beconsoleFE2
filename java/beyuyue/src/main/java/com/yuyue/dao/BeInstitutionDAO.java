package com.yuyue.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yuyue.pojo.BeInstitution;

public interface BeInstitutionDAO extends JpaRepository<BeInstitution, Integer> {

	public List<BeInstitution> findByBeInstitution(BeInstitution beInstitution);
	
	public List<BeInstitution> findByLever(int lever);
	
}
