package egovframework.com.devjitsu.hp.board.service.impl;


import dev_jitsu.MainLib;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.hp.board.repository.BoardRepository;
import egovframework.com.devjitsu.hp.board.service.BoardService;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.Pagination;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private CommonRepository commonRepository;

    @Override
    public PagingResponse<PostResponse> selectBoardList(ArticlePage articlePage) {
        int count = (int) boardRepository.selectBoardListCount(articlePage);
        if (count < 1) {
            return new PagingResponse<>(Collections.emptyList(), null);
        }

        Pagination pagination = new Pagination(count, articlePage);
        articlePage.setPagination(pagination);

        List<PostResponse> list = boardRepository.selectBoardList(articlePage);

        return new PagingResponse<>(list, pagination);
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

        boardRepository.insertBoard(params);

        if(file.length > 0){
            MainLib mainLib = new MainLib();
            List<Map<String, Object>> list = mainLib.multiFileUpload(file, filePath(params, server_dir));
            for(int i = 0 ; i < list.size() ; i++){
                list.get(i).put("frKey", params.get("boardArticleId"));
                list.get(i).put("empSeq", "1");
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

        String path = base_dir + params.get("menuCd").toString()+"File/" + fmtNow + "/";

        return path;
    }

    @Override
    public void updateBoard(Map<String, Object> params) {
        boardRepository.updateBoard(params);
    }

    @Override
    public void deleteBoard(Map<String, Object> params) {
        boardRepository.deleteBoard(params);
    }

    @Override
    public void setBoardArticleViewCount(Map<String, Object> params) { boardRepository.setBoardArticleViewCount(params); }
}
