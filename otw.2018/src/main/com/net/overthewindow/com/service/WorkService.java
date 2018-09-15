package net.overthewindow.com.service;

import java.util.List;

import net.overthewindow.com.domain.Work;

public interface WorkService {
	
	List<Work> workList(Work work);
	
	Work workRead(Work work);
}
