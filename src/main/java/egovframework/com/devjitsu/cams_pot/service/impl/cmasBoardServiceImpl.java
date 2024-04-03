package egovframework.com.devjitsu.cams_pot.service.impl;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.cams_pot.service.camsBoardService;
import egovframework.com.devjitsu.common.utiles.CommonUtil;
import egovframework.com.devjitsu.hp.board.util.Pagination;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import egovframework.com.devjitsu.cams_pot.repository.camsBoardRepository;
import egovframework.com.devjitsu.system.repository.BoardManagementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static egovframework.com.devjitsu.common.utiles.CommonUtil.filePath;

@Service
public class cmasBoardServiceImpl implements camsBoardService {
	
	private static final Logger logger = (Logger) LoggerFactory.getLogger(cmasBoardServiceImpl.class);

    @Autowired
    private camsBoardRepository camsBoardRepository;

    @Autowired
    private BoardManagementRepository boardManagementRepository;

/*    @Override
    public PagingResponse<PostResponse> getRecentBoardArticleList(ArticlePage params) {
        int count = (int) camsBoardRepository.getRecentBoardArticleListCnt(params);
        if (count < 1) {
            return new PagingResponse<>(Collections.emptyList(), null);
        }

        Pagination pagination = new Pagination(count, params);
        params.setPagination(pagination);

        List<PostResponse> list = camsBoardRepository.getRecentBoardArticleList(params);
        return new PagingResponse<>(list, pagination);
    }*/


    @Override
    public Map<String, Object> getBoardInfo(ArticlePage articlePage) {
        Map<String, Object> boardInfo = new HashMap<>();
        boardInfo.put("boardInfo", camsBoardRepository.getBoardInfo(articlePage));
        boardInfo.put("boardCategoryList", boardManagementRepository.getBoardCategoryList(articlePage));

        return boardInfo;
    }

    @Override
    public PagingResponse<PostResponse> getBoardArticleList(ArticlePage params) {

        int count = (int) camsBoardRepository.getBoardArticleListCnt(params);
        if (count < 1) {
            return new PagingResponse<>(Collections.emptyList(), null);
        }

        Pagination pagination = new Pagination(count, params);
        params.setPagination(pagination);

        List<PostResponse> list = camsBoardRepository.getBoardArticleList(params);
        return new PagingResponse<>(list, pagination);

    }

    @Override
    public Object getBoardArticleListCnt(ArticlePage articlePage) {
        return camsBoardRepository.getBoardArticleListCnt(articlePage);
    }

    @Override
    public void setBoardArticleViewCount(Map<String, Object> params) {
        camsBoardRepository.setBoardArticleViewCount(params);
    }

    @Override
    public void setBoardArticle(Map<String, Object> params) {
        if(!StringUtils.isEmpty(params.get("boardArticleOriginId"))){
            params.put("boardArticleLevel", camsBoardRepository.getBoardArticleMaxLevel(params));
        }

        if(!StringUtils.isEmpty(params.get("boardArticleId"))){
            camsBoardRepository.setBoardArticleUpd(params);
        }else{
            if(StringUtils.isEmpty(params.get("boardArticleGroup"))) {
                params.put("boardArticleGroup", camsBoardRepository.getBoardArticleMaxGroup(params));
            }
            camsBoardRepository.setBoardArticle(params);
        }

    }

    @Override
    public void setBoardAttachFileInit(Map<String, Object> params, MultipartFile[] mpfList, String server_dir, String baseDir) {
        MainLib mainLib = new MainLib();
        if(mpfList.length > 0){
            List<Map<String, Object>> list = mainLib.multiFileUpload(mpfList, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("boardArticleId", params.get("boardArticleId"));
                list.get(i).put("fileCd", params.get("boardId"));
                list.get(i).put("filePath", filePath(params, baseDir));
                /*list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);*/
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf('.')));
                /*list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);*/
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf('.')+1));

                list.get(i).put("empSeq", params.get("empSeq"));
            }
            camsBoardRepository.setArticleFileInfo(list);
        }
    }

    @Override
    public Map<String, Object> getArticleInfo(Map<String, Object> params) {
        return camsBoardRepository.getArticleInfo(params);
    }

    @Override
    public List<Map<String, Object>> getArticleFileList(Map<String, Object> params) {
        return camsBoardRepository.getArticleFileList(params);
    }

    @Override
    public List<Map<String, Object>> getArticleReplyList(Map<String, Object> params) {
        return camsBoardRepository.getArticleReplyList(params);
    }

    @Override
    public void setArticleDel(Map<String, Object> params) {
        camsBoardRepository.setArticleDel(params);
    }

    @Override
    public void setArticleReply(Map<String, Object> params) {
        if(!StringUtils.isEmpty(params.get("articleReplyOriginId"))){
            params.put("articleReplyLevel", camsBoardRepository.getArticleReplyMaxLevel(params));
            params.put("articleReplyStep", camsBoardRepository.getArticleReplyMaxStep(params));

            /* 같은 원글(부모)키 순서 업데이트*/
            camsBoardRepository.setArticleReplyStepUpd(params);
        }

        if(!StringUtils.isEmpty(params.get("articleReplyId"))){
            camsBoardRepository.setArticleReplyUpd(params);
        }else{
            if(StringUtils.isEmpty(params.get("articleReplyGroup"))) {
                params.put("articleReplyGroup", camsBoardRepository.getArticleReplyMaxGroup(params));
            }
            camsBoardRepository.setArticleReply(params);
        }
    }

    @Override
    public void setArticleReplyActiveUpd(Map<String, Object> params) {
        camsBoardRepository.setArticleReplyActiveUpd(params);
    }

    private String filePath (Map<String, Object> params, String base_dir){
        String path = base_dir + "board" + "/" + params.get("boardArticleId") + "/";
        return path;
    }

    @Override
    public Map<String, Object> getContentBoardFileOne(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            Map<String, Object> fileMap = new HashMap<>();
            fileMap = camsBoardRepository.getContentBoardFileOne(params);

            CommonUtil commonUtil = new CommonUtil();

            boolean isDelete = commonUtil.deleteFile(new String[]{fileMap.get("FILE_UUID").toString()}, fileMap.get("FILE_PATH").toString());

            if(isDelete){
                camsBoardRepository.getContentBoardFileDelOne(params);
            }else{
                throw new Exception();
            }

            result.put("code", "200");
            result.put("message", "파일이 삭제되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "파일 삭제 중 에러가 발생했습니다.");
        }

        return result;
    }
}