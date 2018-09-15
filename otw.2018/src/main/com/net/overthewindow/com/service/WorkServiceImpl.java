package net.overthewindow.com.service;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.overthewindow.com.domain.Work;
import net.overthewindow.com.domain.WorkFile;
import net.overthewindow.com.mapper.WorkMapper;

@Service
public class WorkServiceImpl implements WorkService{

	@Autowired private WorkMapper<Serializable> mapper;
	
	@Autowired private WorkFileService fileService;
	
	@Override
	public List<Work> workList(Work work) {
		List<Work> lists = mapper.workList(work);
		for(Work w :lists) {
			WorkFile file  = new WorkFile();
			file.setWorkIdx(w.getIdx());
			w.setFiles(fileService.workFileList(file));
		}
		return lists;
	}

	@Override
	public Work workRead(Work work) {
		WorkFile file = new WorkFile();
		file.setWorkIdx(work.getIdx());
		
		work =mapper.workRead(work);
		work.setFiles(fileService.workFileList(file));
		
		return work;
	}

}
