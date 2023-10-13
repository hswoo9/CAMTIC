package egovframework.com.devjitsu.cam_purc.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cam_manager.repository.ManageRepository;
import egovframework.com.devjitsu.cam_purc.repository.PurcRepository;
import egovframework.com.devjitsu.cam_purc.service.PurcService;
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
public class PurcServiceImpl implements PurcService {


    @Autowired
    private PurcRepository purcRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public List<Map<String, Object>> getPurcReqList(Map<String, Object> params) {
        return purcRepository.getPurcReqList(params);
    }

    @Override
    public void setPurcReq(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        if(StringUtils.isEmpty(params.get("purcSn"))){
            purcRepository.setPurcReq(params);
        }else{
            purcRepository.setPurcReqUpd(params);
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
                purcRepository.setPurcItem(map);
            }else {
                purcRepository.setPurcItemUpd(map);
            }
        }

    }

    @Override
    public Map<String, Object> getPurcReq(Map<String, Object> params) {
        Map<String, Object> returnMap = purcRepository.getPurcReq(params);
        returnMap.put("itemList", purcRepository.getPurcItemList(params));

        Map<String, Object> searchMap = new HashMap<>();
        searchMap.put("contentId", "est_" + params.get("purcSn"));
        returnMap.put("estFile", purcRepository.getPurcReqFileInfo(searchMap));
        searchMap.put("contentId", "req_" + params.get("purcSn"));
        returnMap.put("reqFile", purcRepository.getPurcReqFileInfo(searchMap));

        return returnMap;
    }

    @Override
    public List<Map<String, Object>> getPurcItemList(Map<String, Object> params) {
        return purcRepository.getPurcItemList(params);
    }

    @Override
    public Map<String, Object> getPurcItemAmtTotal(Map<String, Object> params) {
        return purcRepository.getPurcItemAmtTotal(params);
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
            purcRepository.updatePurcApprStat(params);
        }else if("30".equals(docSts) || "40".equals(docSts)) { // 반려 - 회수
            purcRepository.updatePurcApprStat(params);
        }else if("100".equals(docSts) || "101".equals(docSts)) { // 종결 - 전결
            params.put("approveStatCode", 100);
            purcRepository.updatePurcFinalApprStat(params);
        }
    }

    @Override
    public List<Map<String, Object>> getMngReqPurcList(Map<String, Object> params) {
        return purcRepository.getMngReqPurcList(params);
    }

    @Override
    public void setPurcItemStat(Map<String, Object> params) {
        purcRepository.updPurcItemStat(params);
    }

    @Override
    public void setPurcClaimData(Map<String, Object> params) {
        Map<String, Object> claimMap = purcRepository.getPurcClaimData(params);

        if(StringUtils.isEmpty(claimMap.get("CLAIM_SN"))){
            purcRepository.insPurcClaimData(params);
        }else{
            params.put("claimSn", claimMap.get("CLAIM_SN"));
            purcRepository.updPurcClaimData(params);
        }

        Gson gson = new Gson();
        List<Map<String, Object>> itemArr = gson.fromJson((String) params.get("itemArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        for(Map<String, Object> map : itemArr){
            map.put("claimSn", params.get("claimSn"));
            if(StringUtils.isEmpty(map.get("claimItemSn"))){
                purcRepository.insPurcClaimItem(map);
            }else {
                purcRepository.updPurcClaimItem(map);
            }
        }
    }

    @Override
    public Map<String, Object> getPurcClaimData(Map<String, Object> params) {
        return purcRepository.getPurcClaimData(params);
    }
}
