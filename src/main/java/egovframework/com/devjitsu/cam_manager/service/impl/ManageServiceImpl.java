package egovframework.com.devjitsu.cam_manager.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_manager.repository.ManageRepository;
import egovframework.com.devjitsu.cam_manager.service.ManageService;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ManageServiceImpl implements ManageService {

    @Autowired
    private ManageRepository manageRepository;

    @Override
    public List<Map<String, Object>> getMemList(Map<String, Object> params) {
        return manageRepository.getMemList(params);
    }

    @Override
    public Map<String, Object> getProjectData(Map<String, Object> map) {
        return manageRepository.getProjectData(map);
    }

    @Override
    public Map<String, Object> getEmpInfo(Map<String, Object> params) {
        return manageRepository.getEmpInfo(params);
    }

    @Override
    public List<Map<String, Object>> getUserPartRateInfo(Map<String, Object> params) {
        return manageRepository.getUserPartRateInfo(params);
    }

    @Override
    public List<Map<String, Object>> getUserSalList(Map<String, Object> params) {
        List<Map<String, Object>> list = new ArrayList<>();
        Map<String, Object> map = new HashMap<>();
        for(int i = 0 ; i < Integer.parseInt(params.get("diffMon").toString()) ; i++){
            map = manageRepository.getUserSalList(params);
            list.add(map);

            params.put("strMonth", LocalDate.parse(params.get("strMonth").toString()).plusMonths(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        }

        return list;
    }

    @Override
    public List<Map<String, Object>> checkExnpDetData(Map<String, Object> params) {

        List<Map<String, Object>> list = new ArrayList<>();

        String itemAr[] = params.get("arr").toString().split(",");

        for(String item : itemAr){
            Map<String, Object> map = new HashMap<>();
            params.put("payAppDetSn", item);

            map = manageRepository.checkExnpDetData(params);

            list.add(map);
        }

        return list;
    }
}
