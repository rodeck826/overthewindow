package net.overthewindow.com.service;

import java.util.List;

import net.overthewindow.com.domain.WorkFile;

public interface WorkFileService {
	
List<WorkFile> workFileList(WorkFile file);
	
	WorkFile workFileRead(WorkFile file);

}
