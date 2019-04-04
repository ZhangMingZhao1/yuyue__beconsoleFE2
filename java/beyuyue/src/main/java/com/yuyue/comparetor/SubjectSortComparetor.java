package com.yuyue.comparetor;

import java.util.Comparator;

import com.yuyue.pojo.BsBooksubject;

public class SubjectSortComparetor implements Comparator<BsBooksubject> {

	@Override
	public int compare(BsBooksubject o1, BsBooksubject o2) {
		return (o1.getIsShow()*(-100)+o1.getSort())-(o2.getIsShow()*(-100)+o2.getSort());
	}

}
