package egovframework.com.devjitsu.doc.process;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProcessServiceImpl implements ProcessService {

    @Autowired
    private ProcessRepository processRepository;

    @Override
    public List<Map<String, Object>> getPsCheckList(Map<String, Object> params) {
        return processRepository.getPsCheckList(params);
    }
}
