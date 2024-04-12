package egovframework.com.devjitsu.hp.board.service.impl;


import dev_jitsu.MainLib;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
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
import java.lang.reflect.Type;
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
    public PagingResponse<PostResponse> getNewsSubscribeList(ArticlePage articlePage) {
        List<PostResponse> list = new ArrayList<>();
        String category = articlePage.getSearchCategory();

        int count = (int) boardRepository.getNewsSubscribeListCnt(articlePage);
        if (count < 1) {
            return new PagingResponse<>(Collections.emptyList(), null);
        }

        Pagination pagination = new Pagination(count, articlePage);
        articlePage.setPagination(pagination);
        list = boardRepository.getNewsSubscribeList(articlePage);

        return new PagingResponse<>(list, pagination);
    }

    @Override
    public List<Map<String, Object>> selectMainList(Map<String, Object> params) {
        return boardRepository.selectMainList(params);
    }

    @Override
    public List<Map<String, Object>> getCategoryAllMainList(Map<String, Object> params) {
        return boardRepository.getCategoryAllMainList(params);
    }

    /*@Override
    public List<Map<String, Object>> selectMainList(Map<String, Object> params) {

        //채용 공고 조회
        List<Map<String, Object>> recruitList = boardRepository.getMainRecruitList(params);

        //게시판 글 목록 조회 (공지사항, 교육행사)
        List<Map<String, Object>> mainList = boardRepository.selectMainList(params);

        //메인페이지 category = all
        List<Map<String, Object>> realMainList = new ArrayList<>();

        System.out.println("main은"+mainList);
        System.out.println("recruit은"+recruitList);


        System.out.println("realMain은"+realMainList);

        //날짜 비교
        for (int i = 0; i < mainList.size(); i++) {
            Date aa = (Date) mainList.get(i).get("REG_DATE");
            boolean flag = true;

            for (int j = 0; j < recruitList.size(); j++) {
                Date bb = (Date) recruitList.get(j).get("REG_DT");

                if (bb.after(aa)) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                realMainList.add(mainList.get(i));
            }
        }

    }        return realMainList;*/


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
    public List<Map<String, Object>> selectNewsBoard(Map<String, Object> params) {
        return boardRepository.selectNewsBoard(params);
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
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }
    }

    @Override
    public void insNews(Map<String, Object> params, MultipartFile[] file, String server_dir, String base_dir) {
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
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }


        int cnt = Integer.parseInt(String.valueOf(params.get("num")));

        for(int x=1; x <= cnt; x++){
            Map<String, Object> newsMap = new HashMap<>();
            newsMap.put("frKey", params.get("boardArticleId"));
            newsMap.put("groupKey", params.get("groupKey"));
            newsMap.put("linkKey", params.get("linkKey" + x));
            newsMap.put("link", params.get("linkText" + x));
            newsMap.put("index", x);
            newsMap.put("contents", params.get("contents" + x));
            newsMap.put("title", params.get("noticeTitle"));

            boardRepository.insertNews(newsMap);
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
                list.get(i).put("fileOrgName", list.get(i).get("orgFilename").toString().substring(0, list.get(i).get("orgFilename").toString().lastIndexOf(".")));
                list.get(i).put("fileExt", list.get(i).get("orgFilename").toString().substring(list.get(i).get("orgFilename").toString().lastIndexOf(".") + 1));
            }
            commonRepository.insFileInfo(list);
        }


        //뉴스게시판 업데이트는 DELETE --> INSERT로 이루어진다.
        if(params.get("menuCd").equals("news")){
            Map<String, Object> frKeyMap = new HashMap<>();
            frKeyMap.put("frKey", params.get("boardArticleId"));

            boardRepository.deleteNews(frKeyMap);

            /*Gson gson = new Gson();
            List<Map<String, Object>> linkInfo = gson.fromJson((String) params.get("linkInfo"), new TypeToken<List<Map<String, Object>>>() {}.getType());*/
            int cnt = Integer.parseInt(String.valueOf(params.get("num")));

            for(int x=1; x <= cnt; x++){
                Map<String, Object> newsMap = new HashMap<>();
                newsMap.put("frKey", params.get("boardArticleId"));
                newsMap.put("groupKey", params.get("groupKey"));
                newsMap.put("linkKey", params.get("linkKey" + x));
                newsMap.put("link", params.get("linkText" + x));
                newsMap.put("index", x);
                newsMap.put("contents", params.get("contents" + x));
                newsMap.put("title", params.get("noticeTitle"));

                boardRepository.insertNews(newsMap);
            }
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

        String devUrl = "http:\\\\218.158.231.186";
        String prodUrl = "http:\\\\218.158.231.184";

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

    @Override
    public Map<String, Object> selectNewsPop(Map<String, Object> params) {
        return boardRepository.selectNewsPop(params);
    }
    @Override
    public Map<String, Object> selectNewsView(Map<String, Object> params) {
        return boardRepository.selectNewsView(params);
    }
    @Override
    public Map<String, Object> getSubscribeChk(Map<String, Object> params) {
        return boardRepository.getSubscribeChk(params);
    }

    @Override public void insSubscribe(Map<String, Object> params) { boardRepository.insSubscribe(params); }
    @Override public void cancleSubscribe(Map<String, Object> param) { boardRepository.cancleSubscribe(param); }

    @Override
    public List<Map<String, Object>> getLetterListOld(Map<String, Object> params) {
        return boardRepository.getLetterListOld(params);
    }
    @Override
    public List<Map<String, Object>> getFocusList(Map<String, Object> param) {
        return boardRepository.getFocusList(param);
    }
    @Override
    public List<Map<String, Object>> getMainRecruitList(Map<String, Object> param) {
        return boardRepository.getMainRecruitList(param);
    }

    @Override
    public List<Map<String, Object>> getSnsPosts(Map<String, Object> param) {
        return boardRepository.getSnsPosts(param);
    }

    @Override
    public PagingResponse<PostResponse> getRecruitmentList(ArticlePage articlePage) {
        List<PostResponse> list = new ArrayList<>();
        String category = articlePage.getSearchCategory();

        int count = (int) boardRepository.getRecruitmentListCount(articlePage);
        if (count < 1) {
            return new PagingResponse<>(Collections.emptyList(), null);
        }

        Pagination pagination = new Pagination(count, articlePage);
        articlePage.setPagination(pagination);

        list = boardRepository.getRecruitmentList(articlePage);

        return new PagingResponse<>(list, pagination);
    }

    @Override
    public List<Map<String, Object>> getArticleFileList(Map<String, Object> params) {
        return boardRepository.getArticleFileList(params);
    }


    @Override
    public List<Map<String, Object>> selectAlarmList(Map<String, Object> params) {
        return boardRepository.selectAlarmList(params);
    }

    @Override
    public List<Map<String, Object>> getMyRecruitList(Map<String, Object> params) {
        return boardRepository.getMyRecruitList(params);
    }

    @Override
    public void cancelMyRecruit(Map<String, Object> params) {
        boardRepository.cancelMyRecruit(params);
    }
}
