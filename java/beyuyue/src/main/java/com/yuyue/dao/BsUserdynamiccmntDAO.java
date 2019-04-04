package com.yuyue.dao;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.yuyue.pojo.BsUserdynamiccmnt;

public interface BsUserdynamiccmntDAO extends JpaRepository<BsUserdynamiccmnt, String> {

	@Query("from BsUserdynamiccmnt t where t.content like ?1 and t.bsUserinfo.nickname like ?2"
			+ " and t.createtime between ?3 and ?4")
	public Page<BsUserdynamiccmnt> queryByContentLikeAndNicknameLikeAndCreateTimeBetween
	(String content, String nickname, Date starttime, Date endtime, Pageable pageable);
	
	@Query("from BsUserdynamiccmnt t where t.bsUserdynamic.dynamicId = ?1 and t.content like ?2 and t.bsUserinfo.nickname like ?3"
			+ " and t.createtime between ?4 and ?5")
	public Page<BsUserdynamiccmnt> queryByDynamicIdAndContentLikeAndNicknameLikeAndCreateTimeBetween
	(String dynamicId, String content, String nickname, Date starttime, Date endtime, Pageable pageable);
	
}
