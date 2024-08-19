package egovframework.com.devjitsu.cams_pot.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cams_pot.repository.CustomBoardRepository;
import egovframework.com.devjitsu.cams_pot.repository.camsBoardRepository;
import egovframework.com.devjitsu.cams_pot.service.CustomBoardService;
import egovframework.com.devjitsu.cams_pot.service.camsBoardService;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.Pagination;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import egovframework.com.devjitsu.system.repository.BoardManagementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class CustomBoardServiceImpl implements CustomBoardService {
	
	private static final Logger logger = (Logger) LoggerFactory.getLogger(CustomBoardServiceImpl.class);

    @Autowired
    private CustomBoardRepository customBoardRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public PagingResponse<PostResponse> getSuggestionSystemList(ArticlePage articlePage) {
        int count = customBoardRepository.getSuggestionSystemListCnt(articlePage);
        if (count < 1) {
            return new PagingResponse<>(Collections.emptyList(), null);
        }

        Pagination pagination = new Pagination(count, articlePage);
        articlePage.setPagination(pagination);

        List<PostResponse> list = customBoardRepository.getSuggestionSystemList(articlePage);
        return new PagingResponse<>(list, pagination);
    }

    @Override
    public Map<String, Object> getSuggestionSystem(Map<String, Object> params) {
        Map<String, Object> returnMap = customBoardRepository.getSuggestionSystem(params);
        if(returnMap != null){
            params.put("contentId", "sb_" + returnMap.get("SUGGESTION_BOARD_ID"));
            params.put("fileCd", "suggestion");

            returnMap.put("fileList", commonRepository.getFileList(params));
        }

        return returnMap;
    }

    @Override
    public void setSuggestionSystem(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("suggestionBoardId"))){
            params.put("suggestionNo", customBoardRepository.getSuggestionSystemNo(params));
            customBoardRepository.setSuggestionSystem(params);
        }else{
            customBoardRepository.setSuggestionSystemUpd(params);
        }
    }

    @Override
    public void setCustomBoardFileInit(Map<String, Object> params, MultipartFile[] mpfList, String server_dir, String base_dir) {
        MainLib mainLib = new MainLib();
        if(mpfList.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(mpfList, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", "sb_" + params.get("suggestionBoardId"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
                list.get(i).put("empSeq", params.get("empSeq"));
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public void setSuggestionSystemDel(Map<String, Object> parmas) {
        customBoardRepository.setSuggestionSystemDel(parmas);
    }

    @Override
    public List<Map<String, Object>> getScheduleList(Map<String, Object> params) {
        String publicClass = String.valueOf(params.get("publicClass"));

        List<Map<String, Object>> result = customBoardRepository.getScheduleList(params);

        if(!publicClass.equals("CS")){
            List<Map<String, Object>> addBustripList = customBoardRepository.getBustripScheduleList(params);
            result.addAll(addBustripList);
            result.addAll(customBoardRepository.getHoliDayScheduleList(params));
            result.addAll(customBoardRepository.getEmpNowYearBdayList(params));
            for (Map<String, Object> map : addBustripList) {
                map.put("page", params.get("page"));
                map.put("date", params.get("date"));
                List<Map<String, Object>> tempList = customBoardRepository.getCompanionScheduleList(map);
                if (tempList != null) {
                    result.addAll(tempList);
                }
            }

        }

        return result;
    }

    @Override
    public List<Map<String, Object>> getTodayScheduleList(Map<String, Object> params) {
        return customBoardRepository.getTodayScheduleList(params);
    }

    @Override
    public List<Map<String, Object>> getBoardFileInfo(Map<String, Object> params) {
        return customBoardRepository.getBoardFileInfo(params);
    }

    @Override
    public void setScheduleReg(Map<String, Object> params) {
        if(StringUtils.isEmpty(params.get("scheduleBoardId"))){
            customBoardRepository.setScheduleReg(params);
        }else{
            customBoardRepository.setScheduleRegUpd(params);
        }
    }

    @Override
    public void setScheduleDel(Map<String, Object> params) {
        customBoardRepository.setScheduleDel(params);
    }

    @Override
    public Map<String, Object> getSchedule(Map<String, Object> params) {
        return customBoardRepository.getSchedule(params);
    }

    @Override
    public PagingResponse<PostResponse> getRequestBoardList(ArticlePage articlePage) {
        int count = customBoardRepository.getRequestBoardListCnt(articlePage);
        if (count < 1) {
            return new PagingResponse<>(Collections.emptyList(), null);
        }

        Pagination pagination = new Pagination(count, articlePage);
        articlePage.setPagination(pagination);

        List<PostResponse> list = customBoardRepository.getRequestBoardList(articlePage);
        return new PagingResponse<>(list, pagination);
    }

    @Override
    public void setRequestBoard(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        if(!params.containsKey("requestBoardId")){
            customBoardRepository.setRequestBoard(params);
        }else{
            customBoardRepository.setRequestBoardUpd(params);
        }

        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("contentId", params.get("requestBoardId"));
                list.get(i).put("empSeq", params.get("empSeq"));
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public Map<String, Object> getRequestBoard(Map<String, Object> params) {
        return customBoardRepository.getRequestBoard(params);
    }

    @Override
    public void setRequestBoardDel(Map<String, Object> params) {
        customBoardRepository.setRequestBoardDel(params);
    }

    @Override
    public void setRequestBoardStatusUpd(Map<String, Object> params) {
        customBoardRepository.setRequestBoardStatusUpd(params);
    }

    @Override
    public PagingResponse<PostResponse> getWatchBoardList(ArticlePage articlePage) {
        int count = customBoardRepository.getWatchBoardListCnt(articlePage);
        if (count < 1) {
            return new PagingResponse<>(Collections.emptyList(), null);
        }

        Pagination pagination = new Pagination(count, articlePage);
        articlePage.setPagination(pagination);

        List<PostResponse> list = customBoardRepository.getWatchBoardList(articlePage);
        return new PagingResponse<>(list, pagination);
    }

    @Override
    public void setWatchBoard(Map<String, Object> params, MultipartHttpServletRequest request, String SERVER_DIR, String BASE_DIR) {
        if(StringUtils.isEmpty(params.get("watchBoardId"))){
            customBoardRepository.setWatchBoard(params);
        }else{
            customBoardRepository.setWatchBoardUpd(params);
        }

        MainLib mainLib = new MainLib();
        Map<String, Object> fileInsMap = new HashMap<>();

        /** 썸네일 파일 */
        MultipartFile file1 = request.getFile("file1");
        if(file1 != null){
            if(!file1.isEmpty()){
                fileInsMap = mainLib.fileUpload(file1, filePath(params, SERVER_DIR));
                fileInsMap.put("contentId", "wb_" + params.get("watchBoardId"));
                fileInsMap.put("fileCd", params.get("menuCd"));
                fileInsMap.put("filePath", filePath(params, BASE_DIR));
                fileInsMap.put("fileOrgName", fileInsMap.get("orgFilename").toString().substring(0, fileInsMap.get("orgFilename").toString().lastIndexOf('.')));
                fileInsMap.put("fileExt", fileInsMap.get("orgFilename").toString().substring(fileInsMap.get("orgFilename").toString().lastIndexOf('.') + 1));
                fileInsMap.put("empSeq", params.get("empSeq"));
                commonRepository.insOneFileInfo(fileInsMap);
            }
        }
    }

    @Override
    public void setWatchBoardViewCount(Map<String, Object> params) {
        customBoardRepository.setWatchBoardViewCount(params);
    }

    @Override
    public Map<String, Object> getWatchBoard(Map<String, Object> params) {
        return customBoardRepository.getWatchBoard(params);
    }

    @Override
    public void setWatchBoardDel(Map<String, Object> params) {
        customBoardRepository.setWatchBoardDel(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + params.get("menuCd").toString()+"/" + fmtNow + "/";

        return path;
    }

    @Override
    public Map<String, Object> getWatchBoardOne(Map<String, Object> params) {
        return customBoardRepository.getWatchBoardOne(params);
    }

    @Override
    public PagingResponse<PostResponse> getMainScheduleList(ArticlePage articlePage) {
        List<PostResponse> list = new ArrayList<>();

        int count = 0;
        if(articlePage.getPublicClass().equals("ES")){
            count = (int) customBoardRepository.getEmpScheduleListCnt(articlePage);
        }else{
            count = (int) customBoardRepository.getMainScheduleListCnt(articlePage);
        }

        if (count < 1) {
            return new PagingResponse<>(Collections.emptyList(), null);
        }
        Pagination pagination = new Pagination(count, articlePage);
        articlePage.setPagination(pagination);

        if(articlePage.getPublicClass().equals("ES")){
            list = customBoardRepository.getEmpScheduleList(articlePage);
        }else{
            list = customBoardRepository.getMainScheduleList(articlePage);
        }

        return new PagingResponse<>(list, pagination);
    }

    @Override
    public List<Map<String, Object>> getMainScheduleList2(Map<String, Object> params){
        return customBoardRepository.getMainScheduleList2(params);
    }

    @Override
    public List<Map<String, Object>> getCustomSchedules(Map<String, Object> params) {
        return customBoardRepository.getCustomSchedules(params);
    }

    @Override
    public void setRequestBoardAdvancementFixesUpd(Map<String, Object> params) {
        customBoardRepository.setRequestBoardAdvancementFixesUpd(params);
    }
}