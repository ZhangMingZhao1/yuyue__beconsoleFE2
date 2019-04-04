package com.yuyue.dao;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.yuyue.pojo.BsUserdynamic;

public interface BsUserdynamicDAO extends JpaRepository<BsUserdynamic, String> {

	@Query("from BsUserdynamic t where t.bsBookinfo.bookName like ?1 and t.content like ?2 and t.bsUserinfo.nickname like ?3"
			+ " and type <> 3 and t.createTime between ?4 and ?5")
	public Page<BsUserdynamic> queryByBookNameLikeAndContentLikeAndNicknameLikeAndCreateTimeBetweenTypeNot
	(String bookName, String content, String nickname, Date starttime, Date endtime, Pageable pageable);
	
	@Query("from BsUserdynamic t where t.content like ?1 and t.bsUserinfo.nickname like ?2"
			+ " and type = 3 and t.createTime between ?3 and ?4")
	public Page<BsUserdynamic> queryByContentLikeAndNicknameLikeAndCreateTimeBetweenTypeEquals
	(String content, String nickname, Date starttime, Date endtime, Pageable pageable);
	
	public Page<BsUserdynamic> findByTypeNot(byte type, Pageable pageable);
	
}
