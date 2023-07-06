package egovframework.com.devjitsu.common;


import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

@Data
public class fileUtils {

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;


}
