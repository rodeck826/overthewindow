

package net.overthewindow.com.support;

import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;

/**
 * Class설명
 * <p>FileName	:	FullBeanNameGenerator.java </p>
 * @author			허근민
 */

public class FullBeanNameGenerator implements org.springframework.beans.factory.support.BeanNameGenerator {
	
	@Override
	public String generateBeanName(BeanDefinition definition, BeanDefinitionRegistry registry) {
		return definition.getBeanClassName();
	}

}
