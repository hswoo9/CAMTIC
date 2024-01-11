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
    private UserManageRepository userManageRepository;

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
    }

    @Override
    public void setHistoryUpdate(Map<String, Object> params) {
        historyRepository.setHistoryUpdate(params);
    }

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


    @Override
    public void modAf(Map<String, Object> params) {
        historyRepository.modAf(params);
    }

    @Override
    public void setTmpActiveUpdate(Map<String,Object> params) {
        historyRepository.setTmpActiveUpdate(params);
    }

}
