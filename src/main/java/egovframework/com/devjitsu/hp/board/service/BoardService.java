package egovframework.com.devjitsu.hp.board.service;

import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;

import java.util.Map;

public interface BoardService {

    /** 게시글 전체조회 */
    PagingResponse<PostResponse> selectBoardList(ArticlePage params);

    /** 게시글 상세조회 */
    Map<String, Object> selectBoard(Map<String, Object> params);

    /** 게시글 작성 */
    void insertBoard(Map<String, Object> params);

    /** 게시글 수정 */
    void updateBoard(Map<String, Object> params);

    /** 게시글 삭제 */
    void deleteBoard(Map<String, Object> params);

    /** 게시글 조회수 증가 */
    void setBoardArticleViewCount(Map<String, Object> params);
}
