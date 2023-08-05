package egovframework.com.devjitsu.cam_project.service.impl;


import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public List<Map<String, Object>> getProjectList(Map<String, Object> params) {
        return projectRepository.getProjectList(params);
    }


    @Override
    public void setProject(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        if(!params.containsKey("pjtSn")){
            projectRepository.insProject(params);
        }

        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("hrBizReqId"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
            }
            commonRepository.insFileInfo(list);
        }
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public Map<String, Object> getProjectStep1(Map<String, Object> params) {
        return projectRepository.getProjectStep1(params);
    }
}
