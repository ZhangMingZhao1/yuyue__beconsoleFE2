package com.yuyue.util;

import java.io.Serializable;
import java.util.List;

public class Lists implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	List<String> dynamicIds;

	List<String> commentIds;

	public List<String> getDynamicIds() {
		return dynamicIds;
	}

	public void setDynamicIds(List<String> dynamicIds) {
		this.dynamicIds = dynamicIds;
	}

	public List<String> getCommentIds() {
		return commentIds;
	}

	public void setCommentIds(List<String> commentIds) {
		this.commentIds = commentIds;
	}
	
}
