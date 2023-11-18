package egovframework.com.devjitsu.cam_manager.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.cam_manager.repository.SetManagementRepository;
import egovframework.com.devjitsu.cam_manager.service.SetManagementService;
import egovframework.com.devjitsu.cam_project.repository.ProjectRndRepository;
import egovframework.com.devjitsu.cam_project.service.impl.ProjectRndServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class SetManagementServiceImpl implements SetManagementService {

    @Autowired
    private SetManagementRepository setManagementRepository;

    @Autowired
    private ProjectRndRepository projectRndRepository;

    @Override
    public void setProject(Map<String, Object> params) {
        if(params.containsKey("corpPjtSn")){
            setManagementRepository.updCorpProject(params);
        } else {
            setManagementRepository.insCorpProject(params);
        }

        params.put("pjtSn", params.get("corpPjtSn").toString());
        if(params.get("sbjSep").toString().equals("Y")){
            Gson gson = new Gson();
            List<Map<String, Object>> ACCOUNT_LIST = new ArrayList<>();
            ACCOUNT_LIST = gson.fromJson((String) params.get("accountList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            params.put("accountList", ACCOUNT_LIST);
            projectRndRepository.insAccountInfo(params);
        }
    }

    @Override
    public List<Map<String, Object>> getCorpProjectList(Map<String, Object> params) {
        return setManagementRepository.getCorpProjectList(params);
    }

    @Override
    public Map<String, Object> getCorpProjectData(Map<String, Object> params) {
        return setManagementRepository.getCorpProjectData(params);
    }
}
