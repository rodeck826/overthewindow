package net.overthewindow.com.mapper;

import java.io.Serializable;
import java.util.List;

import net.overthewindow.com.domain.Work;

public interface WorkMapper <T extends Serializable>{

	List<Work> workList(Work work);
	
	Work workRead(Work work);
}
