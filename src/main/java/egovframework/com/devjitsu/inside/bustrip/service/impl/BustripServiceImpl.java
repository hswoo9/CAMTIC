package egovframework.com.devjitsu.inside.bustrip.service.impl;


import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.gw.user.repository.UserRepository;
import egovframework.com.devjitsu.inside.bustrip.repository.BustripRepository;
import egovframework.com.devjitsu.inside.bustrip.service.BustripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
public class BustripServiceImpl implements BustripService {

    @Autowired
    private BustripRepository bustripRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    public List<Map<String, Object>> getUserList(Map<String, Object> params) {
        return bustripRepository.getUserList(params);
    }

    @Override
    public void setBustripReq(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {

        bustripRepository.insBustripReq(params);
        String compEmpSeq = "";
        String[] compEmpSeqArr;
        if(params.get("compEmpSeq") != null && params.get("compEmpSeq") != ""){
            compEmpSeq = params.get("compEmpSeq").toString();

            compEmpSeqArr = compEmpSeq.split(",");

            for(String str : compEmpSeqArr){
                params.put("compEmpSeq", str);
                params.put("empSeq", params.get("compEmpSeq"));
                Map<String, Object> map = userRepository.getUserInfo(params);
                params.put("compEmpName", map.get("EMP_NAME_KR"));
                params.put("compDeptName", map.get("DEPT_NAME"));
                params.put("compDeptSeq", map.get("DEPT_SEQ"));
                params.put("compDutyName", map.get("DUTY_NAME"));
                params.put("compPositionName", map.get("POSITION_NAME"));

                bustripRepository.insBustripCompanion(params);
            }
        }

        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("purcReqId"));
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
    public List<Map<String, Object>> getBustripReq(Map<String, Object> params) {
        return bustripRepository.getBustripReq(params);
    }
}
