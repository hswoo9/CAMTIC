package egovframework.com.devjitsu.cam_project.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_crm.repository.CrmRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectRndRepository;
import egovframework.com.devjitsu.cam_project.repository.ProjectUnRndRepository;
import egovframework.com.devjitsu.cam_project.service.ProjectUnRndService;
import egovframework.com.devjitsu.cam_purc.repository.PurcRepository;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.doc.approval.repository.ApprovalRepository;
import egovframework.com.devjitsu.g20.repository.G20Repository;
import egovframework.com.devjitsu.gw.user.repository.UserRepository;
import egovframework.com.devjitsu.system.service.MenuManagementService;
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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CrmRepository crmRepository;

    @Autowired
    private PurcRepository purcRepository;

    @Autowired
    private MenuManagementService menuManagementService;

    @Autowired
    private ApprovalRepository approvalRepository;

    @Override
    public void setSubjectInfo(Map<String, Object> params) {
        Map<String, Object> searchMap = new HashMap<>();
        searchMap.put("empSeq", params.get("mngEmpSeq"));

        Map<String, Object> map = userRepository.getUserInfo(params);
        map.put("regEmpSeq", params.get("regEmpSeq"));
        map.put("mngCheck", "Y");
        map.put("psPrepNm", "연구책임자");

        if(!params.containsKey("pjtSn")){
            projectUnRndRepository.insSubjectInfo(params);
            projectUnRndRepository.insUnRndDetail2(params);
            map.put("pjtSn", params.get("pjtSn"));
            projectRndRepository.insRschData(map);
            projectRndRepository.insPjtPsRnd(map);
        } else {
            projectUnRndRepository.updSubjectInfo(params);
            projectUnRndRepository.updUnRndDetail2(params);
            map.put("pjtSn", params.get("pjtSn"));
            projectRndRepository.updRschData(map);
            projectRndRepository.updPjtPsRnd(map);
        }

        // 프로젝트 총괄 책임자 변경
        projectRepository.updPMInfo(params);
    }

    @Override
    public Map<String, Object> getUnRndDetail(Map<String, Object> params) {
        return projectUnRndRepository.getUnRndDetail(params);
    }

    @Override
    public Map<String, Object> getUnRndFileList(Map<String, Object> params) {
        Map<String, Object> resultMap = new HashMap<>();

        params.put("fileCd", "unRnd");
        params.put("contentId", params.get("pjtSn"));
        resultMap.put("bsPlanFile", commonRepository.getFileList(params));

        params.put("contentId", "agreement_" + params.get("pjtSn"));
        resultMap.put("agreementFile", commonRepository.getFileList(params));

        params.put("contentId", "etc_" + params.get("pjtSn"));
        resultMap.put("etcFile", commonRepository.getFileList(params));

        return resultMap;
    }

    @Override
    public Map<String, Object> getMemberIdCheck(Map<String, Object> params) {
        return projectUnRndRepository.getMemberIdCheck(params);
    }

    @Override
    public void setUnRndDetail(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {

        if(params.get("stat") == "ins" || "ins".equals(params.get("stat"))){
            projectUnRndRepository.insUnRndDetail(params);
        } else {
            projectUnRndRepository.updUnRndDetail(params);
        }
        projectRndRepository.delAccountInfo(params);
        projectRndRepository.updPjtSepRnd(params);
        if(params.get("sbjSep").toString().equals("Y")) {
            Gson gson = new Gson();
            List<Map<String, Object>> ACCOUNT_LIST = new ArrayList<>();
            ACCOUNT_LIST = gson.fromJson((String) params.get("accountList"), new TypeToken<List<Map<String, Object>>>() {
            }.getType());
            params.put("accountList", ACCOUNT_LIST);
            projectRndRepository.insAccountInfo(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile[] bsPlanFileList = request.getFiles("bsPlanFileList").toArray(new MultipartFile[0]);
        MultipartFile[] agreementFileList = request.getFiles("agreementFileList").toArray(new MultipartFile[0]);
        MultipartFile[] etcFileList = request.getFiles("etcFileList").toArray(new MultipartFile[0]);

        params.put("menuCd", "unRnd");

        /* 사업계획서 첨부파일 */
        if(bsPlanFileList.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(bsPlanFileList, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("pjtSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        /* 협약서 첨부파일 */
        if(agreementFileList.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(agreementFileList, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "agreement_" + params.get("pjtSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        /* 기타 첨부파일 */
        if(etcFileList.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(etcFileList, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "etc_" + params.get("pjtSn"));
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }

        projectRepository.delCustomBudget(params);
        Gson gson = new Gson();
        List<Map<String, Object>> list = gson.fromJson((String) params.get("customBudget"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        if(list.size() > 0){
            for(Map<String, Object> cbMap : list){
                projectRepository.insCustomBudget(cbMap);
            }
        }

        Map<String, Object> pjtMap = projectRepository.getProjectData(params);
        if(pjtMap.get("SBJ_SEP") != null){
            if(pjtMap.get("SBJ_SEP").toString().equals("Y")){
                projectUnRndRepository.updUnRndTotResCost(params);
            }else{
                projectUnRndRepository.updUnRndTotResCost2(params);
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

            /** 사업비 분리 : 테이블 조회해서 데이터 없으면 단일(0)으로 생성, 있으면 for문 */
            List<Map<String, Object>> list = projectRndRepository.getAccountInfo(params);
            int pjtCnt = g20Repository.getProjectCount(params);
            String pjtCd = params.get("pjtCd").toString();
            String cntCode = String.format("%02d", (pjtCnt + 1));

            if(list.size() == 0){
                params.put("pjtCd", pjtCd + cntCode + "0");
                params.put("pProjectCD", params.get("pjtCd"));
                // G20 프로젝트 추가
                g20Repository.insProject(params);
                projectRepository.updProjectCode(params);
            }else{
                for(int i = 0 ; i < list.size() ; i++){
                    params.put("pProjectCD", pjtCd + cntCode + list.get(i).get("IS_TYPE"));
                    if(i == 0){
                        params.put("pjtCd", params.get("pProjectCD"));
                        projectRepository.updProjectCode(params);
                    }
                    // G20 프로젝트 추가
                    g20Repository.insProject(params);
                }
            }
            // 결재 완료 처리
            projectUnRndRepository.updUnRndProjectInfo(params);
        } catch (Exception e){
            e.printStackTrace();
        }

    }

    @Override
    public List<Map<String, Object>> getLectureTeacherList(Map<String, Object> params) {
        return projectUnRndRepository.getLectureTeacherList(params);
    }
    @Override
    public List<Map<String, Object>> getConTeacherList(Map<String, Object> params) {
        return projectUnRndRepository.getConTeacherList(params);
    }
    @Override
    public List<Map<String, Object>> getPersonList(Map<String, Object> params) {
        return projectUnRndRepository.getPersonList(params);
    }

    @Override
    public Map<String, Object> getPersonData(Map<String, Object> params) {
        return projectUnRndRepository.getPersonData(params);
    }

    @Override
    public Map<String, Object> getPersonReqData(Map<String, Object> params) {
        return projectUnRndRepository.getPersonReqData(params);
    }

    @Override
    public Map<String, Object> getTeacherData(Map<String, Object> params) {
        return projectUnRndRepository.getTeacherData(params);
    }

    @Override
    public List<Map<String, Object>> getLectureTeacherReqList(Map<String, Object> params) {
        return projectUnRndRepository.getLectureTeacherReqList(params);
    }
    @Override
    public List<Map<String, Object>> getConTeacherReqList(Map<String, Object> params) {
        return projectUnRndRepository.getConTeacherReqList(params);
    }

    @Override
    public List<Map<String, Object>> getLecturePersonReqList(Map<String, Object> params) {
        List<Map<String, Object>> list = projectUnRndRepository.getLecturePersonReqList(params);

        if(list != null){
            for (int i = 0 ; i < list.size() ; i++) {
                if(list.get(i).containsKey("FORM_FILE")){
                    List<Map<String, Object>> fileList = new ArrayList<>();

                    String formFile = (String) list.get(i).get("FORM_FILE");
                    String[] fileNos = formFile.split(",");
                    for (String fileNo : fileNos) {
                        list.get(i).put("fileNo", fileNo);
                        Map<String, Object> fileInfo = commonRepository.getContentFileOne(list.get(i));
                        if(fileInfo != null){
                            fileList.add(fileInfo);
                        }
                    }

                    list.get(i).put("fileList", fileList);
                }
            }
        }

        return list;
    }

    @Override
    public List<Map<String, Object>> getLecturePersonDupleCk(Map<String, Object> params) {
        return projectUnRndRepository.getLecturePersonDupleCk(params);
    }

    @Override
    public List<Map<String, Object>> getLectureList(Map<String, Object> params) {
        return projectUnRndRepository.getLectureList(params);
    }

    @Override
    public List<Map<String, Object>> getConsultingList(Map<String, Object> params) {
        return projectUnRndRepository.getConsultingList(params);
    }

    @Override
    public Map<String, Object> getLectureInfo(Map<String, Object> params) {
        Map<String, Object> lecInfo = projectUnRndRepository.getLectureInfo(params);
        Map<String, Object> searchMap = new HashMap<>();
        searchMap.put("fileNo", lecInfo.get("LEC_BOOK_IMG_SN"));
        lecInfo.put("file1", commonRepository.getContentFileOne(searchMap));

        searchMap.put("fileNo", lecInfo.get("LEC_APPL_SN"));
        if (lecInfo.get("LEC_APPL_SN") == null || lecInfo.get("LEC_APPL_SN").toString().isEmpty()) {
            lecInfo.put("file2", commonRepository.getContentFileOne(searchMap));
        } else {
            lecInfo.put("file2", commonRepository.getContentFileList(searchMap));
        }

        searchMap.put("fileNo", lecInfo.get("LEC_MAIN_IMG_SN"));
        lecInfo.put("file3", commonRepository.getContentFileOne(searchMap));

        /*return projectUnRndRepository.getLectureInfo(params);*/
        return lecInfo;
    }

    @Override
    public List<Map<String, Object>> getLectureTeacherInfo(Map<String, Object> params) {
        return projectUnRndRepository.getLectureTeacherInfo(params);
    }

    @Override
    public Map<String, Object> getConsultingInfo(Map<String, Object> params) {
        Map<String, Object> consultingInfo = projectUnRndRepository.getConsultingInfo(params);
       /* Map<String, Object> searchMap = new HashMap<>();
        searchMap.put("CON_SN", consultingInfo.get("CON_SN"));
        consultingInfo.put("teacherInfo", projectUnRndRepository.getConsultingTeacherInfo(searchMap));

        return consultingInfo;*/
        return projectUnRndRepository.getConsultingInfo(params);
    }

    @Override
    public List<Map<String, Object>> getConsultingTeacherInfo(Map<String, Object> params) {
        return projectUnRndRepository.getConsultingTeacherInfo(params);
    }

    @Override
    public void insLectureTeacherInfo(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> TEACHER_LIST = gson.fromJson((String) params.get("teacherList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        params.put("teacherList", TEACHER_LIST);
        projectUnRndRepository.insLectureTeacherInfo(params);
    }

    @Override
    public void insConTeacherInfo(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> TEACHER_LIST = gson.fromJson((String) params.get("teacherList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        params.put("teacherList", TEACHER_LIST);
        projectUnRndRepository.insConTeacherInfo(params);
        projectUnRndRepository.updConTeacherInfo(params);
    }

    @Override
    public void insLecturePersonInfo(Map<String, Object> params) {
        Gson gson = new Gson();
        List<Map<String, Object>> PERSON_LIST = gson.fromJson((String) params.get("personList"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        params.put("personList", PERSON_LIST);
        projectUnRndRepository.insLecturePersonInfo(params);
    }
    @Override
    public void setLecturePersonData(Map<String, Object> params) {
        if(!params.containsKey("personSn")){
            projectUnRndRepository.insPersonData(params);
        }else{
            projectUnRndRepository.updPersonData(params);
        }
    }
    @Override
    public void setLectureTeacherData(Map<String, Object> params) {
        if(!params.containsKey("teacherSn")){
            projectUnRndRepository.insTeacherData(params);
        }else{
            projectUnRndRepository.updTeacherData(params);
        }
    }
    @Override
    public void delLecturePersonData(Map<String, Object> params) {
        projectUnRndRepository.delPersonData(params);
    }
    @Override
    public void delLectureTeacherData(Map<String, Object> params) {
        projectUnRndRepository.delTeacherData(params);
    }
    @Override
    public void insLectureInfo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        params.put("menuCd", "lecReq");
        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile file1 = request.getFile("file1");
        MultipartFile[] file2 = request.getFiles("file2").toArray(new MultipartFile[0]);
        MultipartFile file3 = request.getFile("file3");

        List<Map<String, Object>> fileList = mainLib.multiFileUpload(file2, filePath(params, SERVER_DIR));

        if(file1 != null) {
            if (!file1.isEmpty()) {
                fileInsMap  = mainLib.fileUpload(file1, filePath(params, SERVER_DIR));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                fileInsMap.put("fileCd", "lecBookImgSn");
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                commonRepository.insOneFileInfo(fileInsMap);

                params.put("lecBookImgSn", fileInsMap.get("file_no"));
            }
        }

        if(file2 != null) {
            StringBuilder lecApplSnBuilder = new StringBuilder();
            for (int i = 0; i<fileList.size(); i++) {

                //fileInsMap  = mainLib.fileUpload(file2, filePath(params, SERVER_DIR));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                fileInsMap.put("fileCd", "lecApplSn");
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileList.get(i).get("orgFilename").toString().substring(0, fileList.get(i).get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileList.get(i).get("orgFilename").toString().substring(fileList.get(i).get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("fileUUID", fileList.get(i).get("fileUUID"));
                fileInsMap.put("fileSize", fileList.get(i).get("fileSize"));
                commonRepository.insOneFileInfo(fileInsMap);
                lecApplSnBuilder.append(',').append(fileInsMap.get("file_no"));  // file_no 추가
            }
            String lecApplSn = lecApplSnBuilder.length() > 0 ? lecApplSnBuilder.substring(1) : "";
            params.put("lecApplSn", lecApplSn);
        }

        if(file3 != null) {
            if (!file3.isEmpty()) {
                fileInsMap  = mainLib.fileUpload(file3, filePath(params, SERVER_DIR));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                fileInsMap.put("fileCd", "lecMainImgSn");
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                commonRepository.insOneFileInfo(fileInsMap);

                params.put("lecMainImgSn", fileInsMap.get("file_no"));
            }
        }
        projectUnRndRepository.insLectureInfo(params);
    }

    @Override
    public void insConsultingInfo(Map<String, Object> params) {
        projectUnRndRepository.insConsultingInfo(params);
    }
    @Override
    public void updLectureInfo(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        params.put("menuCd", "lecReq");
        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile file1 = request.getFile("file1");
        MultipartFile[] file2 = request.getFiles("file2").toArray(new MultipartFile[0]);
        MultipartFile file3 = request.getFile("file3");

        List<Map<String, Object>> fileList = mainLib.multiFileUpload(file2, filePath(params, SERVER_DIR));

        String file1sn = (String) params.get("file1sn");
        String file2sn = (String) params.get("file2sn");
        String file3sn = (String) params.get("file3sn");

        if(file1 != null) {
            if (!file1.isEmpty()) {
                if(file1sn != null || file1sn != "") {
                    commonRepository.getContentFileDelOne(params);
                }
                    fileInsMap = mainLib.fileUpload(file1, filePath(params, SERVER_DIR));
                    fileInsMap.put("empSeq", params.get("regEmpSeq"));
                    fileInsMap.put("fileCd", "lecBookImgSn");
                    fileInsMap.put("filePath", filePath(params, BASE_DIR));
                    fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                    fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                    commonRepository.insOneFileInfo(fileInsMap);

                    params.put("lecBookImgSn", fileInsMap.get("file_no"));
            }
        }else{
            params.put("lecBookImgSn", file1sn);
        }
        if (!fileList.isEmpty()) {
            if(file2sn != null || file2sn != "") {
                commonRepository.getContentFileDelOne(params);
            }
            StringBuilder lecApplSnBuilder = new StringBuilder();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file2, filePath(params, SERVER_DIR));
            for(int i = 0 ; i < fileList.size() ; i++){
                list.get(i).put("empSeq", params.get("regEmpSeq"));
                list.get(i).put("fileCd", "lecApplSn");
                list.get(i).put("filePath", filePath(params, BASE_DIR));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf('.')));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf('.') + 1));
                list.get(i).put("fileUUID", fileList.get(i).get("fileUUID"));
                list.get(i).put("fileSize", fileList.get(i).get("fileSize"));

                commonRepository.insOneFileInfo(list.get(i));
                lecApplSnBuilder.append(',').append(list.get(i).get("file_no"));  // file_no 추가
            }
            String lecApplSn = lecApplSnBuilder.length() > 0 ? lecApplSnBuilder.substring(1) : "";
            params.put("lecApplSn", lecApplSn);
        }else{
            params.put("lecApplSn", file2sn);
        }

        if(file3 != null) {
            if (!file3.isEmpty()) {
                if(file3sn != null || file3sn != "") {
                    commonRepository.getContentFileDelOne(params);
                }
                fileInsMap  = mainLib.fileUpload(file3, filePath(params, SERVER_DIR));
                fileInsMap.put("empSeq", params.get("regEmpSeq"));
                fileInsMap.put("fileCd", "lecMainImgSn");
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                commonRepository.insOneFileInfo(fileInsMap);

                params.put("lecMainImgSn", fileInsMap.get("file_no"));

            }
        }else{
            params.put("lecMainImgSn", file3sn);
        }

        projectUnRndRepository.updLectureInfo(params);
    }
    @Override
    public void updLectureInfo2(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        params.put("menuCd", "lecReq");
        commonRepository.getContentFileDelOne(params);
        projectUnRndRepository.updLectureInfo2(params);
    }
    @Override
    public void updLectureTime(Map<String, Object> params) {
        projectUnRndRepository.updLectureTime(params);
    }
    @Override
    public void updConsultingTime(Map<String, Object> params) {
        projectUnRndRepository.updConsultingTime(params);
    }
    @Override
    public void updConsultingInfo(Map<String, Object> params) {
        projectUnRndRepository.updConsultingInfo(params);
    }
    @Override
    public void updPersonApp(Map<String, Object> params) {
        if(params.get("stat").equals("O")){
            String[] strArr = params.get("personList").toString().split(",");
            for (String str : strArr){
                params.put("personSn" , str);
                projectUnRndRepository.updPersonAppStatO(params);
            }
        }else{
            projectUnRndRepository.updPersonApp(params);
        }
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
    @Override
    public void delConTeacherInfo(Map<String, Object> params) {
        projectUnRndRepository.delConTeacherInfo(params);
    }
    @Override
    public void insConTeacherTimeInfo(Map<String, Object> params) {
        projectUnRndRepository.insConTeacherTimeInfo(params);
    }

    @Override
    public void setLecCopyInsert(Map<String, Object> params) {
        projectUnRndRepository.setLecCopyInsert(params);

        params.put("LEC_SN", params.get("lecSn"));
        projectUnRndRepository.setLecTeacherCopyInsert(params);
    }

    @Override
    public void delLecture(Map<String, Object> params) {
        projectUnRndRepository.delLecture(params);
    }

    @Override
    public void delConsulting(Map<String, Object> params) {
        projectUnRndRepository.delConsulting(params);
    }

    @Override
    public void updateUnRndDelvDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("pjtSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            projectUnRndRepository.updateUnRndDelvApprStat(params);
        }else if("20".equals(docSts)) { // 중간 결재
            projectUnRndRepository.updateUnRndDelvApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectUnRndRepository.updateUnRndDelvApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectUnRndRepository.updateUnRndDelvFinalApprStat(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectUnRndRepository.updateUnRndDelvApprStat(params);
        }

        if("10".equals(docSts) || "50".equals(docSts)) {
            /** STEP1. pjtSn 으로 unRndData 호출 */
            Map<String, Object> unRndData = projectUnRndRepository.getUnRndDetail(params);

            /** STEP2. unRndData 에서 UN_RND_FILE_SN 있으면 update */
            if (unRndData != null && !unRndData.isEmpty()) {
                if(unRndData.containsKey("UN_RND_FILE_SN") && unRndData.get("UN_RND_FILE_SN") != null){
                    params.put("fileNo", unRndData.get("UN_RND_FILE_SN").toString());
                    projectRepository.setFileDocNm(params);
                }
            }

            params.put("fileCd", "unRnd");
            params.put("contentId", params.get("pjtSn"));
            for(Map<String, Object> map : commonRepository.getFileList(params)){
                map.put("fileNo", map.get("file_no"));
                map.put("docId", params.get("docId"));
                projectRepository.setFileDocNm(map);
            }

            params.put("contentId", "agreement_" + params.get("pjtSn"));
            for(Map<String, Object> map : commonRepository.getFileList(params)){
                map.put("fileNo", map.get("file_no"));
                map.put("docId", params.get("docId"));
                projectRepository.setFileDocNm(map);
            }

            params.put("contentId", "etc_" + params.get("pjtSn"));
            for(Map<String, Object> map : commonRepository.getFileList(params)){
                map.put("fileNo", map.get("file_no"));
                map.put("docId", params.get("docId"));
                projectRepository.setFileDocNm(map);
            }
        }

        /** 승인함 */
        if("100".equals(docSts) || "101".equals(docSts)){
            /** 상신자 정보 조회 */
            Map<String, Object> result = approvalRepository.getDraftEmpSeq(params);

            params.put("authorityGroupId", "28");
            List<Map<String, Object>> authUser = menuManagementService.getAuthorityGroupUserList(params);
            String recEmpSeq = "|";
            for(Map<String, Object> map : authUser){
                recEmpSeq += map.get("EMP_SEQ") + "|";
            }

            params.put("sdEmpSeq", result.get("DRAFT_EMP_SEQ"));           // 요청자 사번
            params.put("SND_EMP_NM", result.get("DRAFT_EMP_NAME"));        // 요청자 성명
            params.put("SND_DEPT_SEQ", result.get("DRAFT_DEPT_SEQ"));      // 요청자 부서
            params.put("SND_DEPT_NM", result.get("DRAFT_DEPT_NAME"));      // 요청자 부서
            params.put("recEmpSeq", recEmpSeq);              // 승인자
            params.put("ntUrl", "/setManagement/projectCorpMng.do");   // url
            params.put("frKey", approKey);
            params.put("psType", "프로젝트 수주승인요청");

            commonRepository.setPsCheck(params);
        }
    }

    @Override
    public void updateUnRndDevDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("devSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 재상신
            projectRndRepository.updateRndDevApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectRndRepository.updateRndDevApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectRndRepository.updateRndDevFinalApprStat(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectRndRepository.updateRndDevApprStat(params);
        }

        if("10".equals(docSts)){
            /** STEP0. devSn 으로 pjtSn 호출 */
            Map<String, Object> pjtMap = projectRepository.getPjtSnToDev(params);
            params.put("pjtSn", pjtMap.get("PJT_SN"));

            /** STEP1. pjtSn 으로 unRndData 호출 */
            Map<String, Object> unRndMap = projectUnRndRepository.getUnRndDetail(params);

            /** STEP2. unRndData 에서 RND_FILE_SN 있으면 update */
            if (unRndMap != null && !unRndMap.isEmpty()) {
                if(unRndMap.containsKey("UN_RND_FILE_SN") && unRndMap.get("UN_RND_FILE_SN") != null){
                    params.put("fileNo", unRndMap.get("UN_RND_FILE_SN").toString());
                    projectRepository.setFileCopy(params);
                }
            }
        }
    }

    @Override
    public void updateUnRndResDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        System.out.println(approKey);
        System.out.println(processId);
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("pjtSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            projectUnRndRepository.updateUnRndResApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            projectUnRndRepository.updateUnRndResApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            projectUnRndRepository.updateUnRndResFinalApprStat(params);

            Map<String, Object> pjtMap = projectRepository.getProjectData(params);
            crmRepository.insCrmEngnHist(pjtMap);

            projectUnRndRepository.updUnRndProjectInfoRes(params);
        }else if("111".equals(docSts)) { // 임시저장
            projectUnRndRepository.updateUnRndResApprStat(params);
        }

        if("10".equals(docSts)){
            /** STEP1. pjtSn 으로 unRndData 호출 */
            Map<String, Object> unRndMap = projectUnRndRepository.getUnRndDetail(params);

            /** STEP2. unRndData 에서 RND_FILE_SN 있으면 update */
            if (unRndMap != null && !unRndMap.isEmpty()) {
                if(unRndMap.containsKey("UN_RND_FILE_SN") && unRndMap.get("UN_RND_FILE_SN") != null){
                    params.put("fileNo", unRndMap.get("UN_RND_FILE_SN").toString());
                    projectRepository.setFileCopy(params);
                }
            }

            /** STEP1. pjtSn 으로 psMap 호출 */
            Map<String, Object> psPrepMap = projectRepository.getPsPrepInfo(params);

            /** STEP2. psPrepMap 에서 psFile1List ~ psFile6List 있으면 update */
            if(psPrepMap != null && !psPrepMap.isEmpty()) {
                params.put("psFileSn", psPrepMap.get("PS_FILE_SN").toString());
                List<Map<String, Object>> psFile1List = projectRepository.getPsFile1(params);
                List<Map<String, Object>> psFile2List = projectRepository.getPsFile2(params);
                List<Map<String, Object>> psFile3List = projectRepository.getPsFile3(params);
                List<Map<String, Object>> psFile4List = projectRepository.getPsFile4(params);
                List<Map<String, Object>> psFile5List = projectRepository.getPsFile5(params);
                List<Map<String, Object>> psFile6List = projectRepository.getPsFile6(params);

                if(psFile1List.size() > 0){
                    for(Map<String, Object> data : psFile1List){
                        data.put("docId", params.get("docId"));
                        projectRepository.setPsFileDocNm(data);
                    }
                }
                if(psFile2List.size() > 0){
                    for(Map<String, Object> data : psFile2List){
                        data.put("docId", params.get("docId"));
                        projectRepository.setPsFileDocNm(data);
                    }
                }
                if(psFile3List.size() > 0){
                    for(Map<String, Object> data : psFile3List){
                        data.put("docId", params.get("docId"));
                        projectRepository.setPsFileDocNm(data);
                    }
                }
                if(psFile4List.size() > 0){
                    for(Map<String, Object> data : psFile4List){
                        data.put("docId", params.get("docId"));
                        projectRepository.setPsFileDocNm(data);
                    }
                }
                if(psFile5List.size() > 0){
                    for(Map<String, Object> data : psFile5List){
                        data.put("docId", params.get("docId"));
                        projectRepository.setPsFileDocNm(data);
                    }
                }
                if(psFile6List.size() > 0){
                    for(Map<String, Object> data : psFile6List){
                        data.put("docId", params.get("docId"));
                        projectRepository.setPsFileDocNm(data);
                    }
                }
            }

            /** STEP1. pjtSn 으로 resultData 호출 */
            Map<String, Object> resultMap = projectRepository.getResultInfo(params);

            /** STEP2. resultData 에서 DSGN_FILE_SN, PROD_FILE_SN 있으면 update */
            if (resultMap != null && !resultMap.isEmpty()) {
                if(resultMap.containsKey("DEV_FILE_SN")){
                    params.put("fileNo", resultMap.get("DEV_FILE_SN").toString());
                    projectRepository.setResultFileDocNm(params);
                }
            }

            /** STEP1. pjtSn 으로 purcFile 호출 */
            /*List<Map<String, Object>> purcFiles = purcRepository.getProjectReqFile(params);*/

            /** STEP2. purcFile에 데이터 있으면 update */
            /*for(Map<String, Object> data : purcFiles){
                data.put("docId", params.get("docId"));
                projectRepository.setPurcFileDocNm(data);
            }*/
        }
    }

    @Override
    public void setUnitBusnInfo(Map<String, Object> params) {

        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());

        if(params.containsKey("pjtUnitSn")){
            projectRepository.updUnitBusnInfo(params);
        } else {
            projectRepository.insUnitBusnInfo(params);
        }

        projectRepository.delUnitBusnItem(params);

        for(Map<String, Object> item : itemArr){
            item.put("pjtUnitSn", params.get("pjtUnitSn"));
            projectRepository.insUnitBusnItem(item);
        }


    }

    @Override
    public Map<String, Object> getPjtUnitData(Map<String, Object> params) {
        return projectRepository.getPjtUnitData(params);
    }

    @Override
    public List<Map<String, Object>> getUnitBusnList(Map<String, Object> params) {
        return projectRepository.getUnitBusnList(params);
    }

    @Override
    public void delUnitBusn(Map<String, Object> params) {
        projectRepository.delUnitBusn(params);

        List<Map<String, Object>> list = projectRepository.getPjtUnitCrmList(params);
        projectRepository.delUnitBusnItem(params);

        for(Map<String, Object> data : list){
            params.put("pjtUnitSn", data.get("pjtUnitSn"));
            params.put("crmSn", data.get("crmSn"));
            projectRepository.updPurcPjtUnitDetSn(params);
        }
    }

    @Override
    public List<Map<String, Object>> getPjtUnitCrmList(Map<String, Object> params) {
        return projectRepository.getPjtUnitCrmList(params);
    }

    @Override
    public void setPurcUnitCrm(Map<String, Object> params) {
        projectRepository.updPurcUnitCrm(params);
    }

    @Override
    public List<Map<String, Object>> getPopCrmList(Map<String, Object> params) {
        return projectUnRndRepository.getPopCrmList(params);
    }
    @Override
    public Map<String, Object> getPopCrmOne(Map<String, Object> params){
        return projectUnRndRepository.getPopCrmOne(params);
    }
}
