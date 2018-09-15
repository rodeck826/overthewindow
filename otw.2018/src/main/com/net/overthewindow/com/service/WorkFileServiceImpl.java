package net.overthewindow.com.service;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.overthewindow.com.domain.WorkFile;
import net.overthewindow.com.mapper.WorkFileMapper;

@Service
public class WorkFileServiceImpl implements WorkFileService{

	@Autowired private WorkFileMapper<Serializable> mapper;
	
	
	@Override
	public List<WorkFile> workFileList(WorkFile file) {
		return mapper.workFileList(file);
	}

	@Override
	public WorkFile workFileRead(WorkFile file) {
		return mapper.workFileRead(file);
	}

}
