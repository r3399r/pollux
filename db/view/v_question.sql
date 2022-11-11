CREATE VIEW v_question AS with tmp as (
    select
    	question_id,
        string_agg(tag.id::string,',') as tag_id
    from question_tag
        left join tag on question_tag.tag_id = tag.id
    group by question_id
)
select q.id,
    q.content,
    q.answer,
    q.solution,
    q.is_mathjax,
    q.user_id,
    q.date_created,
    q.date_updated,
    tmp.tag_id
from question q
    left join tmp on q.id = tmp.question_id;