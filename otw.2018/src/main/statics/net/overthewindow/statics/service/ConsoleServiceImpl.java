package net.overthewindow.statics.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.transform.Result;

import org.springframework.stereotype.Service;

@Service
public class ConsoleServiceImpl implements ConsoleService{

	@Override
	public List<Map<String,String>> messageBranch(String msg) {
		List<Map<String,String>> resultList = new ArrayList<>();
		Map<String,String> result = null;
		
		if(msg.equals("contact")){
			result = new HashMap<>();
			result.put("func", "view");
			result.put("arg","contact");
			resultList.add(result);
		}else if(msg.equals("clear")){
			result = new HashMap<>();
			result.put("func", "clear");
			result.put("arg", "");
			resultList.add(result);
			
		}else if(msg.equals("help")){
			result = new HashMap<>();
			result.put("func", "print");
			result.put("arg", "&nbsp;&nbsp;&nbsp;&nbsp;");
			resultList.add(result);
			
			
			result = new HashMap<>();
			result.put("func", "print");
			result.put("arg", " &nbsp;&nbsp;&nbsp;&nbsp;clear = Clear console message.");
			resultList.add(result);
			
			result = new HashMap<>();
			result.put("func", "print");
			result.put("arg", " &nbsp;&nbsp;&nbsp;&nbsp;contact = Displays contact form. ");
			resultList.add(result);
			
			result = new HashMap<>();
			result.put("func", "print");
			result.put("arg", "&nbsp;&nbsp;&nbsp;&nbsp;work = Displays my works");
			resultList.add(result);
			
			result = new HashMap<>();
			result.put("func", "print");
			result.put("arg", "&nbsp;&nbsp;&nbsp;&nbsp;labs = Displays my labs");
			resultList.add(result);
			
			result = new HashMap<>();
			result.put("func", "print");
			result.put("arg", " &nbsp;&nbsp;&nbsp;&nbsp;help = Displays hompage commands ");
			resultList.add(result);
			
			result = new HashMap<>();
			result.put("func", "print");
			result.put("arg", " &nbsp;&nbsp;&nbsp;&nbsp;what to do = Displays what can i do.");
			resultList.add(result);
			
			result = new HashMap<>();
			result.put("func", "print");
			result.put("arg", "&nbsp;&nbsp;&nbsp;&nbsp;");
			resultList.add(result);
			
			result = new HashMap<>();
			result.put("func", "scrollUp");
			result.put("arg", "");
			resultList.add(result);
		}else if(msg.equals("skills")){
			result = new HashMap<>();
			result.put("func", "view");
			result.put("arg","todo");
			resultList.add(result);
		}else if(msg.equals("clock")) {
			result = new HashMap<>();
			result.put("func", "view");
			result.put("arg", "clock");
		}else if(msg.equals("location")){
			result = new HashMap<>();
			result.put("func", "view");
			result.put("arg","location");
		}else if(msg.equals("portfolio")){
			result = new HashMap<>();
			result.put("func", "view");
			result.put("arg","work");
			resultList.add(result);
		}else if(msg.equals("labs")){
			
		}else if(msg.equals("change background")){
			result = new HashMap<>();
			result.put("func", "background");
			result.put("arg", "");
			resultList.add(result);
		}else{
			result = new HashMap<>();
			result.put("func", "print");
			result.put("arg", "- SYSTEM : command not found!");
			resultList.add(result);
		}
		return resultList;
	}

	
}
