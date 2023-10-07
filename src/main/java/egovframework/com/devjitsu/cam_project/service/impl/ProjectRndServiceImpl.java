package egovframework.com.devjitsu.cam_project.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_project.repository.ProjectRndRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectRndService;
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
public class ProjectRndServiceImpl implements ProjectRndService {

    @Autowired
    private ProjectRndRepository projectRndRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public void setSubjectInfo(Map<String, Object> params) {

        if(!params.containsKey("pjtSn")){
            projectRndRepository.insSubjectInfo(params);
        } else {
            projectRndRepository.updSubjectInfo(params);
        }

    }

    @Override
    public List<Map<String, Object>> getPopRschList(Map<String, Object> params) {
        return projectRndRepository.getPopRschList(params);
    }

    @Override
    public Map<String, Object> getRschData(Map<String, Object> params) {
        return projectRndRepository.getRschData(params);
    }

    @Override
    public void setRschData(Map<String, Object> params) {
        projectRndRepository.insRschData(params);
    }

    @Override
    public List<Map<String, Object>> getPjtRschInfo(Map<String, Object> params) {
        return projectRndRepository.getPjtRschInfo(params);
    }

    @Override
    public int getRschCount(Map<String, Object> params) {
        return projectRndRepository.getRschCount(params);
    }

    @Override
    public void delRschData(Map<String, Object> params) {
        projectRndRepository.delRschData(params);
    }

    @Override
    public void setDevPjtVer(Map<String, Object> params) {
        projectRndRepository.insDevPjtVer(params);
    }

    @Override
    public void setDevInfo(Map<String, Object> params) {
        projectRndRepository.updDevInfo(params);
    }

    @Override
    public List<Map<String, Object>> getRndDevScheduleList(Map<String, Object> params) {
        return projectRndRepository.getRndDevScheduleList(params);
    }

    @Override
    public void setDevSchData(Map<String, Object> params) {
        projectRndRepository.insDevSchData(params);
    }

    @Override
    public List<Map<String, Object>> getRndDevJobList(Map<String, Object> params) {
        return projectRndRepository.getRndDevJobList(params);
    }

    @Override
    public void setDevJobInfo(Map<String, Object> params, MultipartFile[] fileList, String SERVER_DIR, String BASE_DIR) {

        if(!params.containsKey("devSchSn")){
            Map<String, Object> map = new HashMap<>();

            map = projectRndRepository.getDevJobData(params);

            params.put("devSchSn", map.get("DEV_SCH_SN"));
        }

        projectRndRepository.updDevJobInfo(params);


        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        if(fileList.length > 0){
            params.put("menuCd", "devSchJob");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("devSchSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public List<Map<String, Object>> getDevSchInfo(Map<String, Object> params) {
        return projectRndRepository.getDevSchInfo(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;

    }

    @Override
    public Map<String, Object> getRndDetail(Map<String, Object> params) {
        return projectRndRepository.getRndDetail(params);
    }

    @Override
    public void setRndDetail(Map<String, Object> params) {
        if(params.get("stat") == "ins" || "ins".equals(params.get("stat"))){
            projectRndRepository.insRndDetail(params);
        } else {
            projectRndRepository.updRndDetail(params);
        }
    }

    @Override
    public void setDelvApprove(Map<String, Object> params) {
        projectRndRepository.setDelvApprove(params);
        projectRndRepository.updRndProjectInfo(params);
    }

    @Override
    public void setReqPartRateData(Map<String, Object> params, MultipartFile[] fileList, String serverDir, String baseDir) {

        if(!params.containsKey("partRateSn")){
            projectRndRepository.insReqPartRateData(params);
            projectRndRepository.insReqPartRateVerData(params);
        } else {
            projectRndRepository.updReqPartRateData(params);
        }


        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        if(fileList.length > 0){
            params.put("menuCd", "rndPartRate");

            List<Map<String, Object>> list = mainLib.multiFileUpload(fileList, filePath(params, serverDir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("partRateSn"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, baseDir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public Map<String, Object> getReqPartRateData(Map<String, Object> params) {
        return projectRndRepository.getReqPartRateData(params);
    }

    @Override
    public List<Map<String, Object>> getFileList(Map<String, Object> params) {
        params.put("contentId", params.get("PART_RATE_SN"));
        params.put("fileCd", "rndPartRate");

        return commonRepository.getFileList(params);
    }

    @Override
    public void setPartRateRequest(Map<String, Object> params) {
        projectRndRepository.setPartRateRequest(params);
    }

    @Override
    public List<Map<String, Object>> getReqPartRateVerList(Map<String, Object> params) {
        return projectRndRepository.getReqPartRateVerList(params);
    }
}

