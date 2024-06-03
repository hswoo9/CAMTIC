package egovframework.com.devjitsu.inside.history.service.impl;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.common.utiles.ConvertUtil;
import egovframework.com.devjitsu.common.utiles.EgovStringUtil;
import egovframework.com.devjitsu.inside.history.repository.HistoryRepository;
import egovframework.com.devjitsu.inside.history.service.HistoryService;
import egovframework.com.devjitsu.inside.userManage.repository.UserManageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static egovframework.com.devjitsu.common.utiles.CommonUtil.filePath;

@Service
public class HistoryServiceImpl implements HistoryService {

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private HistoryRepository historyRepository;


    @Override
    public List<Map<String, Object>> getHistoryList(Map<String, Object> params) {
        return historyRepository.getHistoryList(params);
    }

    @Override
    public List<Map<String, Object>> getHistoryListAdmin(Map<String, Object> params) {
        return historyRepository.getHistoryListAdmin(params);
    }

    @Override
    public List<Map<String, Object>> getUpdHistoryList(Map<String, Object> params) {
        return historyRepository.getUpdHistoryList(params);
    }

    @Override
    public List<Map<String, Object>> getUpdRewardList(Map<String, Object> params) {
        return historyRepository.getUpdRewardList(params);
    }

    @Override
    public Map<String, Object> getHistoryOne(Map<String, Object> params) {
        return historyRepository.getHistoryOne(params);
    }

    @Override
    public List<Map<String, Object>> getRewardList(Map<String, Object> params) {
        return historyRepository.getRewardList(params);
    }

    @Override
    public void setHistoryInsert(Map<String, Object> params, String base_dir) {
        //Gson gson = new Gson();
        //List<Map<String, Object>> historyList = gson.fromJson((String) params.get("historyArr"), new TypeToken<List<Map<String, Object>>>(){}.getType());
        //params.put("historyList", historyList);
        historyRepository.setHistoryInsertTest(params);

        //ConvertUtil convertUtil = new ConvertUtil();
        //Map<String, Object> fileSaveMap = new HashMap<>();
        ///fileSaveMap = convertUtil.StringToFileConverter(EgovStringUtil.nullConvert(params.get("docFileStr")), "hwp", params, base_dir, "");
        //fileSaveMap.put("contentId", params.get("apntSn"));
        ///commonRepository.insOneFileInfo(fileSaveMap);
        appointmentEmpInfoUpd(params);
    }

    @Override
    public void setHistoryUpdate(Map<String, Object> params) {
        historyRepository.setHistoryUpdate(params);
        appointmentEmpInfoUpd(params);
    }

    @Override
    public void setHistoryDelete(Map<String, Object> params) {
        historyRepository.setHistoryDelete(params);
    }

    /*
    @Override
    public void setRewardInsert(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        if(StringUtils.isEmpty(params.get("rewordId"))){
            historyRepository.setRewardInsert(params);
        }else{
            historyRepository.setRewardUpdate(params);
        }


        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("rewordId"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
                System.out.println("file_no"+list.get(i).get("file_no"));
            }
            commonRepository.insFileInfo(list);
        }

    }
     */

    @Override
    public void setRewardInsert(Map<String, Object> params, MultipartHttpServletRequest request, String server_dir, String base_dir) {
        if(StringUtils.isEmpty(params.get("rewordId"))){
            historyRepository.setRewardInsert(params);
        }else{
            historyRepository.setRewardUpdate(params);
        }

        /*
        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("rewordId"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
                System.out.println("file_no"+list.get(i).get("file_no"));
            }
            commonRepository.insFileInfo(list);
        }
         */
        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        MultipartFile rewardFile = request.getFile("rewardFile");

        if(rewardFile != null){
            if(!rewardFile.isEmpty()){
                fileInsMap = mainLib.fileUpload(rewardFile, filePath(params, server_dir));
                fileInsMap.put("contentId", params.get("rewordId"));
                fileInsMap.put("rewordId", params.get("rewordId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, base_dir));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);

                fileInsMap.put("rewardAddFileNo", fileInsMap.get("file_no"));
                System.out.println("***fileInsMap***"+fileInsMap);
                historyRepository.setInRewardAddFileNoUpdNoTmp(fileInsMap);
            }
        }

    }

    @Override
    public void setRewardDelete(Map<String, Object> params) {
        historyRepository.setRewardDelete(params);
    }


    @Override
    public void modAf(Map<String, Object> params) {
        historyRepository.modAf(params);
    }

    @Override
    public void setTmpActiveUpdate(Map<String,Object> params) {
        historyRepository.setTmpActiveUpdate(params);
    }

    @Override
    public void appointmentEmpInfoUpd(Map<String, Object> params) {
        List<Map<String, Object>> apntList = historyRepository.appointmentNowList(params);
        for(Map<String, Object> map : apntList){
            Map<String, Object> upDateMap = new HashMap<>();
            upDateMap.put("empSeq", map.get("EMP_SEQ"));
            if(map.get("AF_TEAM_SEQ") != null){
                if(map.get("AF_TEAM_SEQ").equals("")){
                    upDateMap.put("afTeamSeq", map.get("AF_DEPT_SEQ"));
                }else{
                    upDateMap.put("afTeamSeq", map.get("AF_TEAM_SEQ"));
                }
            }

            if(map.get("AF_DEPT_NAME") != null){
                upDateMap.put("afDeptName", map.get("AF_DEPT_NAME"));
            }

            if(map.get("AF_TEAM_NAME") != null){
                upDateMap.put("afTeamName", map.get("AF_TEAM_NAME"));
            }

            if(map.get("AF_POSITION_CODE") != null){
                upDateMap.put("afPositionCode", map.get("AF_POSITION_CODE"));
            }

            if(map.get("AF_POSITION_NAME") != null){
                upDateMap.put("afPositionName", map.get("AF_POSITION_NAME"));
            }

            if(map.get("AF_DUTY_CODE") != null){
                upDateMap.put("afDutyCode", map.get("AF_DUTY_CODE"));
            }

            if(map.get("AF_DUTY_NAME") != null){
                upDateMap.put("afDutyName", map.get("AF_DUTY_NAME"));
            }


            upDateMap.put("afJobDetail", map.get("AF_JOB_DETAIL"));
            upDateMap.put("empSeq", map.get("EMP_SEQ"));
            upDateMap.put("apntSn", map.get("APNT_SN"));
            historyRepository.appointmentEmpInfoUpd(upDateMap);
            historyRepository.appointmentComplete(upDateMap);
        }
    }

}
