package egovframework.com.devjitsu.hp.board.service.impl;


import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.common.utiles.CommonUtil;
import egovframework.com.devjitsu.hp.board.repository.BoardRepository;
import egovframework.com.devjitsu.hp.board.service.BoardService;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.Pagination;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public PagingResponse<PostResponse> selectBoardList(ArticlePage articlePage) {
        List<PostResponse> list = new ArrayList<>();
        String category = articlePage.getSearchCategory();

        int count = (int) boardRepository.selectBoardListCount(articlePage);
        if (count < 1) {
            return new PagingResponse<>(Collections.emptyList(), null);
        }

        Pagination pagination = new Pagination(count, articlePage);
        articlePage.setPagination(pagination);
        if(category.equals("notice") || category.equals("business") || category.equals("study") || category.equals("partner")){
            list = boardRepository.selectBoardList(articlePage);
        }else {
            list = boardRepository.selectPrBoardList(articlePage);
        }
        return new PagingResponse<>(list, pagination);
    }

    @Override
    public List<Map<String, Object>> selectMainList(Map<String, Object> params) {
        return boardRepository.selectMainList(params);
    }
    @Override
    public List<Map<String, Object>> selectBsnsMainList(Map<String, Object> params) {
        return boardRepository.selectBsnsMainList(params);
    }

    @Override
    public Object selectBoardListCnt(ArticlePage articlePage) {
        return boardRepository.selectBoardListCount(articlePage);
    }

    @Override
    public Map<String, Object> selectBoard(Map<String, Object> params) {
        return boardRepository.selectBoard(params);
    }
    @Override
    public List<Map<String, Object>> selectBoardFile(Map<String, Object> params) {
        return boardRepository.selectBoardFile(params);
    }

    @Override
    public void insertBoard(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        HttpServletRequest servletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        boardRepository.insertBoard(params);

        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, listFilePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("frKey", params.get("boardArticleId"));
                list.get(i).put("empSeq", "1");
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(servletRequest, params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public void updateBoard(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
        HttpServletRequest servletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        boardRepository.updateBoard(params);

        /*List<Map<String, Object>> chkList = boardRepository.selectBoardFile(params);
        for(int x = 0; x< chkList.size(); x++){
            Map<String, Object> chkMap = new HashMap<>();

            chkMap.put("fileNo", chkList.get(x).get("file_no"));
            getContentFileOne(chkMap);
        }*/

        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, listFilePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("frKey", params.get("boardArticleId"));
                list.get(i).put("empSeq", "1");
                list.get(i).put("fileCd", params.get("menuCd"));
                list.get(i).put("filePath", filePath(servletRequest, params, base_dir));
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().split("[.]")[0]);
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().split("[.]")[1]);
            }
            commonRepository.insFileInfo(list);
        }

    }

    /** 파일서버 첨부파일 삭제 */
    private Map<String, Object> getContentFileOne(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            Map<String, Object> fileMap = new HashMap<>();
            fileMap = commonRepository.getContentFileOne(params);

            CommonUtil commonUtil = new CommonUtil();
            boolean isDelete = commonUtil.deleteFile(new String[]{fileMap.get("file_uuid").toString()}, fileMap.get("file_path").toString());

            if(isDelete){
                commonRepository.getContentFileDelOne(params);
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

    private String filePath(HttpServletRequest request, Map<String, Object> params, String base_dir){
        String path = "";

        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String devUrl = "http:\\\\218.158.231.186:8080";
        String prodUrl = "http:\\\\218.158.231.186:8080";

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1") || request.getServerName().contains("218.158.231.186")){
            path = devUrl + base_dir + "boardFile/" + params.get("menuCd").toString()+"File/" + fmtNow + "/";
        }else{
            path = prodUrl + base_dir + "boardFile/" + params.get("menuCd").toString()+"File/" + fmtNow + "/";
        }

        return path.replace("\\\\", "//");
    }

    private String listFilePath (Map<String, Object> params, String base_dir){
        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String path = base_dir + "boardFile/" + params.get("menuCd").toString()+"File/" + fmtNow + "/";

        return path;
    }



    @Override
    public void deleteBoard(Map<String, Object> params) {
        boardRepository.deleteBoard(params);
    }

    @Override
    public void setBoardArticleViewCount(Map<String, Object> params) { boardRepository.setBoardArticleViewCount(params); }
}
