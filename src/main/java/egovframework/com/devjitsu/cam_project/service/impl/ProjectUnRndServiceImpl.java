package egovframework.com.devjitsu.cam_project.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_project.repository.ProjectUnRndRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectUnRndService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectUnRndServiceImpl implements ProjectUnRndService {

    @Autowired
    private ProjectUnRndRepository projectUnRndRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public void setSubjectInfo(Map<String, Object> params) {
        if(!params.containsKey("pjtSn")){
            projectUnRndRepository.insSubjectInfo(params);
        } else {
            projectUnRndRepository.updSubjectInfo(params);
        }
    }

    @Override
    public Map<String, Object> getUnRndDetail(Map<String, Object> params) {
        return projectUnRndRepository.getUnRndDetail(params);
    }

    @Override
    public void setUnRndDetail(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        if(params.get("stat") == "ins" || "ins".equals(params.get("stat"))){
            projectUnRndRepository.insUnRndDetail(params);
        } else {
            projectUnRndRepository.updUnRndDetail(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile bsPlanFile = request.getFile("bsPlanFile");
        if(bsPlanFile != null){
            if(!bsPlanFile.isEmpty()){
                params.put("menuCd", "unRnd");
                fileInsMap = mainLib.fileUpload(bsPlanFile, filePath(params, SERVER_DIR));
                fileInsMap.put("unRndSn", params.get("unRndSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("file_no", fileInsMap.get("file_no"));
                projectUnRndRepository.updUnRndFileSn(fileInsMap);
            }
        }
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }
}
