package egovframework.com.devjitsu.doc.process;

import java.util.List;
import java.util.Map;

public interface ProcessService {
    List<Map<String, Object>> getPsCheckList(Map<String, Object> params);
}
