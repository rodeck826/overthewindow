package net.overthewindow.com.mapper;

import java.io.Serializable;
import java.util.List;

import net.overthewindow.com.domain.WorkFile;

public interface WorkFileMapper <T extends Serializable>{
	List<WorkFile> workFileList(WorkFile file);
	
	WorkFile workFileRead(WorkFile file);
}
