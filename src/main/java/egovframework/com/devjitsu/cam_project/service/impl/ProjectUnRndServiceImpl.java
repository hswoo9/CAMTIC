package egovframework.com.devjitsu.cam_project.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRndRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectUnRndRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectUnRndService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProjectUnRndServiceImpl implements ProjectUnRndService {

    @Autowired
    private ProjectUnRndRepository projectUnRndRepository;

    @Autowired
    private ProjectRndRepository projectRndRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private G20Repository g20Repository;

    @Override
    public void setSubjectInfo(Map<String, Object> params) {
        if(!params.containsKey("pjtSn")){
            projectUnRndRepository.insSubjectInfo(params);
        } else {
            projectUnRndRepository.updSubjectInfo(params);
            projectRndRepository.delAccountInfo(params);
        }

        if(params.get("sbjSep").toString().equals("Y")){
            Gson gson = new Gson();
            List<Map<String, Object>> ACCOUNT_LIST = new ArrayList<>();
            ACCOUNT_LIST = gson.fromJson((String) params.get("accountList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
            params.put("accountList", ACCOUNT_LIST);
            projectRndRepository.insAccountInfo(params);
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

    @Override
    public void setDelvApprove(Map<String, Object> params) {

        try{
            projectRepository.updTmpProjectCode(params);
            projectUnRndRepository.setDelvApprove(params);

            // 결재 완료 처리
            projectUnRndRepository.updUnRndProjectInfo(params);
            int pjtCnt = g20Repository.getProjectCount(params);

            params.put("pjtCd", params.get("pjtCd") + String.format("%02d", (pjtCnt + 1)) + "0");
            params.put("pProjectCD", params.get("pjtCd"));

            // G20 프로젝트 추가
            g20Repository.insProject(params);
            projectRepository.updProjectCode(params);

        } catch (Exception e){
            e.printStackTrace();
        }

    }

    @Override
    public List<Map<String, Object>> getLectureTeacherList(Map<String, Object> params) {
        return projectUnRndRepository.getLectureTeacherList(params);
    }
    @Override
    public List<Map<String, Object>> getPersonList(Map<String, Object> params) {
        return projectUnRndRepository.getPersonList(params);
    }

    @Override
    public List<Map<String, Object>> getLectureTeacherReqList(Map<String, Object> params) {
        return projectUnRndRepository.getLectureTeacherReqList(params);
    }

    @Override
    public List<Map<String, Object>> getLecturePersonReqList(Map<String, Object> params) {
        return projectUnRndRepository.getLecturePersonReqList(params);
    }

    @Override
    public List<Map<String, Object>> getLectureList(Map<String, Object> params) {
        return projectUnRndRepository.getLectureList(params);
    }

    @Override
    public Map<String, Object> getLectureInfo(Map<String, Object> params) {
        return projectUnRndRepository.getLectureInfo(params);
    }
    @Override
    public void insLectureTeacherInfo(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> TEACHER_LIST = gson.fromJson((String) params.get("teacherList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        params.put("teacherList", TEACHER_LIST);
        projectUnRndRepository.insLectureTeacherInfo(params);
    }
    @Override
    public void insLecturePersonInfo(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> PERSON_LIST = gson.fromJson((String) params.get("personList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        params.put("personList", PERSON_LIST);
        projectUnRndRepository.insLecturePersonInfo(params);
    }
    @Override
    public void insLectureInfo(Map<String, Object> params) {
        projectUnRndRepository.insLectureInfo(params);
    }
    @Override
    public void updLectureInfo(Map<String, Object> params) {
        projectUnRndRepository.updLectureInfo(params);
    }
    @Override
    public void updPersonApp(Map<String, Object> params) {
        projectUnRndRepository.updPersonApp(params);
    }
    @Override
    public void updPersonPartic(Map<String, Object> params) {
        projectUnRndRepository.updPersonPartic(params);
    }
    @Override
    public void updPersonAudit(Map<String, Object> params) {
        projectUnRndRepository.updPersonAudit(params);
    }
    @Override
    public void updPersonRefund(Map<String, Object> params) {
        projectUnRndRepository.updPersonRefund(params);
    }
    @Override
    public void updPersonPay(Map<String, Object> params) {
        projectUnRndRepository.updPersonPay(params);
    }
    @Override
    public void delLecturePersonInfo(Map<String, Object> params) {
        projectUnRndRepository.delLecturePersonInfo(params);
    }
    @Override
    public void delLectureInfo(Map<String, Object> params) {
        projectUnRndRepository.delLectureInfo(params);
    }
    @Override
    public void delLectureTeacherInfo(Map<String, Object> params) {
        projectUnRndRepository.delLectureTeacherInfo(params);
    }
}
