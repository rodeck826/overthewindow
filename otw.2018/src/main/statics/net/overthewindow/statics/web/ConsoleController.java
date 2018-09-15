package net.overthewindow.statics.web;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import net.overthewindow.com.domain.Work;
import net.overthewindow.com.service.WorkService;
import net.overthewindow.statics.domain.Contact;
import net.overthewindow.statics.service.ConsoleService;

@Controller
public class ConsoleController {

	private Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired private ConsoleService consoleService;
	
	@Autowired private WorkService workService;
	
	@Autowired private JavaMailSender mailSender;
	
	
	
	@GetMapping(value="/console.otw")
	public String main(ModelMap model) {
		
		return "statics/console/main";
	}
	
	
	@PostMapping(value="/json/message.otw",produces="application/json")
	public @ResponseBody Object message(ModelMap model, String msg) {
		return consoleService.messageBranch(msg);
	}
	
	
	@GetMapping(value="/text/intro.otw")
	public void introText(ModelMap model,HttpServletResponse response) {
		String path =this.getClass().getResource("/../../words/").getPath();
		StringBuffer sb = new StringBuffer();
		try {
			BufferedReader br = new BufferedReader(new FileReader(new File(path+"intro.txt")));
			String temp = "";
			
			while((temp = br.readLine())!=null) {
				sb.append(temp);
				sb.append("\n");
			}
			
			response.getWriter().println(sb.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@GetMapping(value="/layer/contact.otw")
	public String contact(ModelMap model,Contact contact) {
		model.addAttribute("contact",contact);
		return "statics/contact/main";
	}
	
	@GetMapping(value="/layer/todo.otw")
	public String todo(ModelMap model) {
		return "statics/todo/main";
	}
	
	@GetMapping(value="/layer/work.otw")
	public String work(ModelMap model,Work work) {
		model.addAttribute("works",workService.workList(work));
		
		return "statics/work/main";
	}
	
	
	@RequestMapping(value="/ajax/mail/send.otw")
	public @ResponseBody Map<String,Object> mailSend(ModelMap model,Contact contact){
		
		log.debug(contact.getName()+":"+contact.getEmail()+":"+contact.getSubject()+":"+contact.getContext());
		Map<String,Object> result = new HashMap<>();
		try {
			StringBuffer sb = new StringBuffer();
			MimeMessage msg = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(msg);
			
			sb.append("name : "+contact.getName()+"\r\n");
			sb.append("email : "+contact.getEmail()+"\r\n");
			sb.append("context : "+contact.getContext()+"\r\n");
			helper.setFrom(contact.getEmail());
			helper.setTo("rodeck826@overthewindow.net");
			helper.setText(sb.toString());
			helper.setSubject(contact.getSubject());
			
			mailSender.send(msg);
			mailSendWriter(contact.getName(),contact.getEmail(), contact.getSubject(),contact.getContext());
		}catch(Exception e) {
			e.printStackTrace();
			result.put("result", "error");
		}
		return result;
	}
	
	private void mailSendWriter(String name,String email, String subject, String context) {
		try {
			SimpleDateFormat format = new SimpleDateFormat("yyyyMMddhhmmss");
			
			String date = format.format(new Date());
			String path = this.getClass().getClassLoader().getResource("/../../storage").getPath();
			File folder = new File(path+"email_log");
			File file = new File(path+"email_log/"+date+".log");
			
			if(!folder.exists())  folder.mkdirs();
			
			BufferedWriter br = new BufferedWriter(new FileWriter(file));
			StringBuffer sb = new StringBuffer();
			sb.append("name : "+name+"\r\n");
			sb.append("email : "+email+"\r\n");
			sb.append("subject : "+subject+"\r\n");
			sb.append("context : "+context+"\r\n");
			br.write(sb.toString());
			br.flush();
			br.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
