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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ManageServiceImpl implements ManageService {

    @Autowired
    private ManageRepository manageRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public List<Map<String, Object>> getPurcReqManageList(Map<String, Object> params) {
        return manageRepository.getPurcReqManageList(params);
    }

    @Override
    public void setPurcReq(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        if(StringUtils.isEmpty(params.get("purcSn"))){
            manageRepository.setPurcReq(params);
        }else{
            manageRepository.setPurcReqUpd(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 견적서 파일 */
        MultipartFile file1 = request.getFile("file1");
        if(file1 != null){
            if(!file1.isEmpty()){
                fileInsMap = mainLib.fileUpload(file1, filePath(params, SERVER_DIR));
                fileInsMap.put("contentId", "est_" + params.get("purcSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);
            }
        }

        /** 요청서 파일 */
        MultipartFile file2 = request.getFile("file2");
        if(file2 != null){
            if(!file2.isEmpty()){
                fileInsMap = mainLib.fileUpload(file2, filePath(params, SERVER_DIR));
                fileInsMap.put("contentId", "req_" + params.get("purcSn"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().split("[.]")[0]);
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().split("[.]")[1]);
                fileInsMap.put("empSeq", params.get("empSeq"));

                commonRepository.insOneFileInfo(fileInsMap);
            }
        }

        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        for(Map<String, Object> map : itemArr){
            map.put("purcSn", params.get("purcSn"));
            if(StringUtils.isEmpty(map.get("purcItemSn"))){
                manageRepository.setPurcItem(map);
            }else {
                manageRepository.setPurcItemUpd(map);
            }
        }

    }

    @Override
    public Map<String, Object> getPurcReq(Map<String, Object> params) {
        Map<String, Object> returnMap = manageRepository.getPurcReq(params);
        returnMap.put("itemList", manageRepository.getPurcItemList(params));

        Map<String, Object> searchMap = new HashMap<>();
        searchMap.put("contentId", "est_" + params.get("purcSn"));
        returnMap.put("estFile", manageRepository.getPurcReqFileInfo(searchMap));
        searchMap.put("contentId", "req_" + params.get("purcSn"));
        returnMap.put("reqFile", manageRepository.getPurcReqFileInfo(searchMap));

        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getPurcItemList(Map<String, Object> params) {
        return manageRepository.getPurcItemList(params);
    }

    @Override
    public Map<String, Object> getPurcItemAmtTotal(Map<String, Object> params) {
        return manageRepository.getPurcItemAmtTotal(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public void updatePurcDocState(Map<String, Object> bodyMap) throws Exception {
        bodyMap.put("docSts", bodyMap.get("approveStatCode"));
        String docSts = String.valueOf(bodyMap.get("docSts"));
        String approKey = String.valueOf(bodyMap.get("approKey"));
        String docId = String.valueOf(bodyMap.get("docId"));
        String processId = String.valueOf(bodyMap.get("processId"));
        String empSeq = String.valueOf(bodyMap.get("empSeq"));
        approKey = approKey.split("_")[1];
        bodyMap.put("approKey", approKey);

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("purcSn", approKey);
        params.put("docName", bodyMap.get("formName"));
        params.put("docId", docId);
        params.put("docTitle", bodyMap.get("docTitle"));
        params.put("approveStatCode", docSts);
        params.put("empSeq", empSeq);

        if("10".equals(docSts) || "50".equals(docSts)) { // 상신 - 결재
            manageRepository.updatePurcApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            manageRepository.updatePurcApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            manageRepository.updatePurcFinalApprStat(params);
        }
    }

}
